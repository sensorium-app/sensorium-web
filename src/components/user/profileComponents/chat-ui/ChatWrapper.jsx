import React, { Component } from 'react';
import { FixedWrapper } from '@livechat/ui-kit'
import Maximized from './ChatMaximized';
import Minimized from './ChatMinimized';
import firebaseConf, {firebase} from './../../../../config/FirebaseConfig';
import moment from 'moment';
import ErrorBoundary from './../../../errorHandling/ErrorBoundary';

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
        this.chatPagingNumber = 50;
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
            //This variable will help to determine if the state shouldn't be changed yet for when the same user sends a message,
            //not messages sent by someone else
            var messagesHasPendingWrites = messages.metadata.hasPendingWrites;
            
            if(!messagesHasPendingWrites){
                var chatMessages = [];

                messages.forEach((message)=> {
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

                var count = 0;
                var chatMessagesReversed = [];
                for(var i=chatMessages.length-1; i>=0; i--){
                    count = count + 1;
                    if(this.state.messages.indexOf(chatMessages[i])===-1){
                        chatMessagesReversed.push(chatMessages[i])
                    }
                }

                if(this.state.messages.length > 0){
                    //Only adds the last detected message sent to the chat
                    this.setState({
                        messages: this.state.messages.concat(chatMessagesReversed[chatMessagesReversed.length-1])
                    })
                }else{
                    this.lastChatDocRef = messages.docs[messages.docs.length-1];
                    //Adds the whole list of messages to the state
                    this.setState({
                        messages: this.state.messages.concat(chatMessagesReversed)
                    })
                }
            }
              
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