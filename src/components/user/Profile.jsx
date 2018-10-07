import React, { Component, ReactDOM } from 'react'
import { withRouter } from 'react-router-dom';
import '../style/Home.css';
import '../style/style.css';
import '../style/responsive.css';
import './profileComponents/styles/profile.css';
import {Row, Col} from 'reactstrap';
import firebaseConf, {firebase} from './../../config/FirebaseConfig';
import ProfileMenu from './profileComponents/ProfileMenu';
import { FixedWrapper } from '@livechat/ui-kit'
import Maximized from './profileComponents/ChatMaximized';
import Minimized from './profileComponents/ChatMinimized';
import Post from './profileComponents/post-ui/Post';
import moment from 'moment';

class Profile extends Component {

    constructor(props, context) {
        super(props,context);
        console.log(props);
        this.state = {
            authUser: props.authUser,
            dateOfBirth: '',
            desiredClusters: {},
            name: '',
            lastName:'',
            secondLastName: '',
            numSensatesInCluster: 0,
            sensatesInCluster: [],
            photo: require('./profilepic.png'),
            messages: [],
            showLoadEarlierMessages: true,
            posts: [],
            showLoadEarlierPosts: true,
        };

        this.db = firebaseConf.firestore();
        const settings = { timestampsInSnapshots: true};
        this.db.settings(settings);

        this.clusterChatId = '';
        this.lastDocRef;
        this.chatPagingNumber = 50;
        this.postPagingNumber = 25;

        this.sensateListener;
        this.clusterListener; 
        this.chatListener;
        this.postsListener;

        this.sensatesQueryArray = [];
        this.sensatesList = [];
    }

    sendMessageToChat(chatText){
        const serverDate = firebase.firestore.FieldValue.serverTimestamp();
        const date = new Date();
        const dateNumber = date.getTime();
        const message = {
            "_id": dateNumber,
            "text": chatText,
            "createdAt": serverDate,
            "system": false,
            "user": {
              "_id": this.state.authUser.uid,
              "name": this.state.name,
              "avatar": this.state.photo
            },
            "id": dateNumber,
            "type": "text",
            "date": serverDate,
            "status": "sent",
            "avatar": this.state.photo
        }
        console.log(message, chatText)
        
        this.db.collection("clusters").doc(this.clusterChatId).collection('messages').add(message).then((res)=>{
            console.log(res, 'update state');
        }).catch((err)=>{
            console.log(err);
        });
    }

    addClusterPost(postObject){
        const serverDate = firebase.firestore.FieldValue.serverTimestamp();
        const date = new Date();
        const dateNumber = date.getTime();
        const post = {
            "text": postObject.text,
            "user": {
              "_id": this.state.authUser.uid,
              "name": this.state.name,
              "avatar": this.state.photo
            },
            "id": dateNumber,
            "type": "text",
            "date": serverDate,
            "status": "sent",
        }
        console.log(post)
        
        this.db.collection("clusters").doc(this.clusterChatId).collection('posts').add(post).then((res)=>{
            console.log(res, 'update state');
        }).catch((err)=>{
            console.log(err);
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.path === this.props.location.pathname && this.props.location.pathname !== prevProps.location.pathname) {
          window.scrollTo(0, 0)
        }
    }

    componentWillUnmount(){
        //unsubscribe from all listeners to avoid memory leaks
        if(this.sensateListener){
            this.sensateListener();
        }
        if(this.clusterListener){
            this.clusterListener();
        }
        if(this.chatListener){
            this.chatListener();
        }
        if(this.postsListener){
            this.postsListener();
        }
    }

    componentDidMount(){
        this.sensateListener = this.db.collection("sensies").doc(this.state.authUser.uid)
        .onSnapshot((doc) =>{
            if(doc.exists){
                const sensate = doc.data();
                
                this.clusterListener = this.db.collection("clusters").where("sensates."+doc.id, "==", true)
                .onSnapshot((querySnapshot) =>{
                    querySnapshot.forEach((doc)=>{
                        const clusterData = doc.data();

                        let numSensatesInCluster = 0;
                        this.sensatesQueryArray = [];
                        
                        Object.keys(clusterData.sensates).forEach((sensateId)=>{
                            if(clusterData.sensates[sensateId]){
                                numSensatesInCluster = numSensatesInCluster + 1;
                                this.sensatesQueryArray.push(
                                    this.db.collection("sensies").doc(sensateId).get()
                                );
                            }
                        });
                        //subtract his own reference
                        numSensatesInCluster = numSensatesInCluster - 1;
                        this.setState({numSensatesInCluster: numSensatesInCluster});

                        this.sensatesList = [];

                        Promise.all(this.sensatesQueryArray).then((sensatesMembers)=>{
                            sensatesMembers.forEach((sensateMemberData)=>{
                                if(sensateMemberData.exists){
                                    const sensateMemberInfo = sensateMemberData.data();
                                    this.sensatesList.push({
                                        uid: sensateMemberInfo.uid,
                                        name: sensateMemberInfo.name,
                                        lastName: sensateMemberInfo.lastName
                                    });
                                }
                            });
                            this.setState({
                                sensatesInCluster: this.sensatesList
                            });
                        }).catch((err)=>{
                            console.log(err);
                        });

                        //Cluster chat
                        this.clusterChatId = doc.id;
                        this.chatListener = this.db.collection("clusters").doc(this.clusterChatId).collection('messages')
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

                                    //position
                                    if(msg.user._id === this.state.authUser.uid){
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
                                    this.lastDocRef = messages.docs[messages.docs.length-1];
                                    console.log(this.lastDocRef)
                                    //Adds the whole list of messages to the state
                                    this.setState({
                                        messages: this.state.messages.concat(chatMessagesReversed)
                                    })
                                }
                            }
                              
                        });

                        //Initialize the Posts Listener
                        this.initPostsListener();

                    });
                });

                this.setState(sensate);
                
            }else{
                console.log("Sensate doesn't exist");
                alert("Sensate doesn't exist or an error ocurred");
            }
        });
    }

    loadEarlierMessages(){
        this.setState({
            showLoadEarlierMessages: false,
        });

        this.db.collection("clusters").doc(this.clusterChatId).collection('messages')
        .orderBy("date", "desc")
        .startAfter(this.lastDocRef)
        .limit(this.chatPagingNumber).get().then((earlierMessages)=>{
            var chatMessages = [];

            this.lastDocRef = earlierMessages.docs[earlierMessages.docs.length-1];
            console.log(this.lastDocRef)

            earlierMessages.forEach((message)=> {
                var id = message.id;
                var msg = message.data();

                //position
                if(msg.user._id === this.state.authUser.uid){
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

    initPostsListener(){
        this.postsListener = this.db.collection("clusters").doc(this.clusterChatId).collection('posts')
            .orderBy("date", "desc").limit(this.postPagingNumber)
            .onSnapshot({
                includeMetadataChanges: true
            },
            (posts)=>{
                var postsHasPendingWrites = posts.metadata.hasPendingWrites;
                if(!postsHasPendingWrites){
                    var postsArray = [];
                    posts.forEach((post)=>{
                        var postData = post.data();
                        postData['_id'] = post.id;
                        postData['date'] = moment(postData.date.seconds * 1000);
                        postsArray.push(postData);
                        this.setState({
                            posts: postsArray
                        },()=> console.log(this.state.posts))
                    });
                }
            });
    }
    
    render() {

        return (
            <Row>
                <div id="outer-container">
            
                <Col md={3} className="no-padd">
                    <div className="no-padd">
                        <ProfileMenu photo={this.state.photo} name={this.state.name} 
                            lastName={this.state.lastName} numSensatesInCluster={this.state.numSensatesInCluster}
                            sensatesInClusterData={this.state.sensatesInCluster}
                            menuOpen={this.props.menuOpen} handleStateChange={this.props.handleStateChange} 
                            bigScreen={this.props.bigScreen}>
                        </ProfileMenu>
                        <p>{this.props.menuOpen}</p>
                    
                    </div>
                </Col>
                <Col className="" md={9}>
                   
                    <Col md={6}>
                        {
                            this.state.posts.map((postData)=>{
                                return(
                                    <Post key={postData._id} userData={postData.user} text={postData.text} date={postData.date}/>
                                )
                            })
                        }
                        <button className="btn btn-grad-peach wow bounceIn registerBtn" type="button" onClick={this.addClusterPost.bind(this, {
                            text: 'hey: ' + new Date().getTime()
                        })}>Add random Post</button>
                    </Col>    
                    
                </Col>
                <div id="page-wrap"></div>
                    <FixedWrapper.Root>
                        <FixedWrapper.Maximized>
                            <Maximized {...this.props} messages={this.state.messages}
                                chatText={this.chatText} sendMessageToChat={this.sendMessageToChat.bind(this)}
                                loadEarlierMessages={this.loadEarlierMessages.bind(this)} showLoadEarlierMessages={this.state.showLoadEarlierMessages} />
                        </FixedWrapper.Maximized>
                        <FixedWrapper.Minimized>
                            <Minimized {...this.props} />
                        </FixedWrapper.Minimized>
                    </FixedWrapper.Root>
                </div>
            </Row>
        )
    }
}

export default withRouter(Profile);