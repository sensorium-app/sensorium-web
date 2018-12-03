import React, { Component } from 'react';
import { FixedWrapper } from '@livechat/ui-kit'
import Maximized from './ChatMaximized';
import Minimized from './ChatMinimized';
import firebaseConf, {firebase} from './../../../../config/FirebaseConfig';
import moment from 'moment';
import ErrorBoundary from './../../../errorHandling/ErrorBoundary';
import { arrayContainsObject } from './../../misc/Functions';
import update from 'immutability-helper';

class ChatWrapper extends Component {

    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            showLoadEarlierMessages: true,
        };

        this.db = firebaseConf.firestore();
        const settings = { timestampsInSnapshots: true};
        this.db.settings(settings);

        this.clusterId = '';
        this.lastChatDocRef;
        this.chatPagingNumber = 5;
        this.chatListener;

        this.dropzoneRef;

        this.loadEarlierMessages = this.loadEarlierMessages.bind(this);
        this.sendMessageToChat = this.sendMessageToChat.bind(this);
    }

    componentDidMount(){
        this.clusterId = this.props.clusterId;
        this.loadChatMessages();
    }

    componentWillUnmount(){
        // Unsubscribe from all listeners to avoid memory leaks
        if(this.chatListener){
            this.chatListener();
        }
    }

    sendMessageToChat(chatText, files){
        const serverDate = firebase.firestore.FieldValue.serverTimestamp();
        const date = new Date();
        const dateNumber = date.getTime();
        let message = {
            "_id": dateNumber,
            "createdAt": serverDate,
            "system": false,
            "user": {
              "_id": this.props.authUser.uid,
              "name": this.props.userName,
              "avatar": this.props.userAvatar
            },
            "id": dateNumber,
            "type": "text",
            "date": serverDate,
            "status": "sent",
            "avatar": this.props.userAvatar
        };

        if(files && files.length>0){
            var storage = firebase.storage();
            var storageRef = storage.ref();
            var clustersRef = storageRef.child('clusters');
            var clusterRef = clustersRef.child(this.clusterId);
            var chatMediaRef = clusterRef.child('chatMedia');
            var imageRef = chatMediaRef.child(new Date().getTime() + files[0].name);

            imageRef.put(files[0]).then((snapshot)=> {
                var imagePath = snapshot.ref.location.path;
                message['text'] = chatText;
                message['imagePath'] = imagePath;
                this.db.collection("clusters").doc(this.clusterId).collection('messages').add(message).then((res)=>{
                }).catch((err)=>{
                    console.log(err);
                });
            }).catch((err)=>{
                console.log(err);
            });
        }else{
            message['text'] = chatText;
            this.db.collection("clusters").doc(this.clusterId).collection('messages').add(message).then((res)=>{
            }).catch((err)=>{
                console.log(err);
            });
        }
    }

    loadChatMessages(){
        //Cluster chat
        this.chatListener = this.db.collection("clusters").doc(this.clusterId).collection('messages')
        .orderBy("date", "desc").limit(this.chatPagingNumber)
        .onSnapshot({
            includeMetadataChanges: true
        },
        (messages)=>{
            messages.docChanges().forEach((change)=> {
                var messagesHasPendingWrites = messages.metadata.hasPendingWrites;
                if(!messagesHasPendingWrites){
                    if (change.type === "added") {
                            var messagesArray = [];
                            messages.forEach((message,i)=>{
                                var messageData = message.data();
                                var id = message.id;
                                
                                messageData['_id'] = id;
                                messageData['date'] = moment(messageData.date.seconds * 1000);
                                messageData['dateString'] = messageData.date.format('hh:mm a');
                                // For the positioning of the message
                                if(messageData.user._id === this.props.authUser.uid){
                                    messageData['isOwn'] = true;
                                }else{
                                    messageData['isOwn'] = false;
                                }

                                messageData['title'] = messageData.user.name;
                                messageData['titleColor'] = 'blue';
                                messageData['id'] = id;

                                messagesArray.push(messageData);
                            });

                            var count = 0;
                            var chatMessagesReversed = [];
                            for(var i=messagesArray.length-1; i>=0; i--){
                                count = count + 1;
                                if(this.state.messages.indexOf(messagesArray[i])===-1){
                                    chatMessagesReversed.push(messagesArray[i])
                                }
                            }

                            this.setState({
                                messages: chatMessagesReversed,
                            })
                    }
                }

                if (change.type === "modified") {
                    var messageData = change.doc.data();
                    messageData['_id'] = change.doc.id;
                    messageData['date'] = moment(messageData.date.seconds * 1000);
                    messageData['dateString'] = messageData.date.format('hh:mm a');
                    if(messageData.user._id === this.props.authUser.uid){
                        messageData['isOwn'] = true;
                    }else{
                        messageData['isOwn'] = false;
                    }

                    var objExists = arrayContainsObject(messageData, this.state.messages);
                    if(objExists === null){
                        this.setState({
                            messages: [...this.state.messages, messageData ],
                        });
                    }else{
                        this.setState({
                            messages: update(this.state.messages, {[objExists]:  {$set: messageData} })
                        });
                    }
                }
                
            });
        });
    }

    loadEarlierMessages(){
        this.setState({
            showLoadEarlierMessages: false,
        });

        this.db.collection("clusters").doc(this.clusterId).collection('messages')
        .orderBy("date", "desc")
        .startAfter(this.lastChatDocRef)
        .limit(this.chatPagingNumber).get().then((earlierMessages)=>{
            var chatMessages = [];

            this.lastChatDocRef = earlierMessages.docs[earlierMessages.docs.length-1];

            earlierMessages.forEach((message)=> {
                var id = message.id;
                var msg = message.data();

                // For the positioning of the message
                if(msg.user._id === this.props.authUser.uid){
                    msg['isOwn'] = true;
                }else{
                    msg['isOwn'] = false;
                }

                if(msg.date && msg.date.seconds){
                    msg['dateString'] = moment(msg.date.seconds * 1000).format('hh:mm a');
                    msg['date'] = moment(msg.date.seconds * 1000);
                }
                msg['title'] = msg.user.name;
                msg['titleColor'] = 'blue';
                msg['id'] = id;

                chatMessages.push(msg);     
            });

            var chatMessagesReversed = [];
            for(var i=chatMessages.length-1; i>=0; i--){
                chatMessagesReversed.push(chatMessages[i])
            }

            var olderMessagesMerged = chatMessagesReversed.concat(this.state.messages);
            this.setState({
                messages: olderMessagesMerged,
                showLoadEarlierMessages: true,
            });
        }).catch((err)=>{
            console.log(err); 
            alert('Error getting earlier messages');
        });
    }

    render() {
        return (
            <ErrorBoundary>
                <FixedWrapper.Root>
                    <FixedWrapper.Maximized>
                        <Maximized {...this.props} messages={this.state.messages}
                            chatText={this.chatText} sendMessageToChat={this.sendMessageToChat}
                            loadEarlierMessages={this.loadEarlierMessages} showLoadEarlierMessages={this.state.showLoadEarlierMessages} />
                    </FixedWrapper.Maximized>
                    <FixedWrapper.Minimized>
                        <Minimized {...this.props} />
                    </FixedWrapper.Minimized>
                </FixedWrapper.Root>
            </ErrorBoundary>
        );
    }
}

export default ChatWrapper;