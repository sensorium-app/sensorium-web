import React, { Component, ReactDOM } from 'react'
import { withRouter } from 'react-router-dom';
import '../style/Home.css';
import '../style/style.css';
import '../style/responsive.css';
import './profileComponents/styles/profile.css';
import {Row, Col, Card, Button, CardTitle, CardText} from 'reactstrap';
import firebaseConf, {firebase} from './../../config/FirebaseConfig';
import ProfileMenu from './profileComponents/ProfileMenu';
import { FixedWrapper } from '@livechat/ui-kit'
import Maximized from './profileComponents/chat-ui/ChatMaximized';
import Minimized from './profileComponents/chat-ui/ChatMinimized';
import Post from './profileComponents/post-ui/Post';
import moment from 'moment';
import Dropzone from 'react-dropzone';

class Profile extends Component {

    constructor(props, context) {
        super(props,context);
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
            dropzoneActive: false,
        };

        this.db = firebaseConf.firestore();
        const settings = { timestampsInSnapshots: true};
        this.db.settings(settings);

        this.clusterId = '';
        this.lastChatDocRef;
        this.chatPagingNumber = 50;
        this.lastPostDocRef;
        this.postPagingNumber = 2;

        this.sensateListener;
        this.clusterListener; 
        this.chatListener;
        this.postsListener;

        this.sensatesQueryArray = [];
        this.sensatesList = [];
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
              "_id": this.state.authUser.uid,
              "name": this.state.name,
              "avatar": this.state.photo
            },
            "id": dateNumber,
            "type": "text",
            "date": serverDate,
            "status": "sent",
            "avatar": this.state.photo
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
                //this.addClusterPost('text here...' + new Date().getTime(), imagePath);
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

    prepareClusterPost(postObject, files){
        if(files.length>0){
            var storage = firebase.storage();
            var storageRef = storage.ref();
            var clustersRef = storageRef.child('clusters');
            var clusterRef = clustersRef.child(this.clusterId);
            var imageRef = clusterRef.child(new Date().getTime() + files[0].name);

            //var message = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
            imageRef.put(files[0]).then((snapshot)=> {
                var imagePath = snapshot.ref.location.path;
                this.addClusterPost('text here...' + new Date().getTime(), imagePath);
            }).catch((err)=>{
                console.log(err);
            });
            
        }else{
            this.addClusterPost('text here...' + new Date().getTime(), undefined);
        }
    }

    addClusterPost(text, imagePath){
        const serverDate = firebase.firestore.FieldValue.serverTimestamp();
        const date = new Date();
        const dateNumber = date.getTime();
        const post = {
            "text": text,
            "text": 'hola ' + new Date().getTime(),
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
        if(imagePath){
            post['image'] = imagePath
        }
        
        this.db.collection("clusters").doc(this.clusterId).collection('posts').add(post).then((res)=>{
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
                        this.clusterId = doc.id;
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
                                    this.lastChatDocRef = messages.docs[messages.docs.length-1];
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

        this.db.collection("clusters").doc(this.clusterId).collection('messages')
        .orderBy("date", "desc")
        .startAfter(this.lastChatDocRef)
        .limit(this.chatPagingNumber).get().then((earlierMessages)=>{
            var chatMessages = [];

            this.lastChatDocRef = earlierMessages.docs[earlierMessages.docs.length-1];

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
        this.postsListener = this.db.collection("clusters").doc(this.clusterId).collection('posts')
            .orderBy("date", "desc").limit(this.postPagingNumber)
            .onSnapshot({
                includeMetadataChanges: true
            },
            (posts)=>{
                var postsHasPendingWrites = posts.metadata.hasPendingWrites;
                if(!postsHasPendingWrites){
                    var postsArray = [];
                    posts.forEach((post,i)=>{
                        var postData = post.data();
                        postData['_id'] = post.id;
                        postData['date'] = moment(postData.date.seconds * 1000);

                        if(this.state.posts.indexOf(postsArray[i])===-1){
                            postsArray.push(postData);
                        }
                        
                    });

                    if(this.state.posts.length > 0){
                        //only add the last post
                        var newPostsArray = [];
                        newPostsArray.push(postsArray[0]);
                        console.log(postsArray, newPostsArray)

                        this.setState({
                            posts: newPostsArray.concat(this.state.posts),
                        })
                    }else{
                        //add all the posts to the state
                        this.lastPostDocRef = posts.docs[posts.docs.length-1];
                        this.setState({
                            posts: postsArray
                        })
                    }
                }
            });
    }

    loadEarlierPosts(){
        this.setState({
            showLoadEarlierPosts: false,
        });

        this.db.collection("clusters").doc(this.clusterId).collection('posts')
        .orderBy("date", "desc")
        .startAfter(this.lastPostDocRef)
        .limit(this.postPagingNumber).get().then((earlierPosts)=>{
            var posts = [];

            this.lastPostDocRef = earlierPosts.docs[earlierPosts.docs.length-1];

            earlierPosts.forEach((post)=> {
                var id = post.id;
                var postData = post.data();

                postData['date'] = moment(postData.date.seconds * 1000);
                postData['_id'] = id;

                posts.push(postData);     
            });

            var olderPostsMerged = this.state.posts.concat(posts);
            this.setState({
                posts: olderPostsMerged,
                showLoadEarlierPosts: true,
            });
        }).catch((err)=>{
            console.log(err); 
            alert('Error getting earlier posts');
        });
    }

    onDragEnter() {
        this.setState({
            dropzoneActive: true
        });
    }

    onDragLeave() {
        this.setState({
            dropzoneActive: false
        });
    }

    onDrop(files) {
        this.prepareClusterPost(undefined, files);
        this.setState({
            //files,
            dropzoneActive: false
        });
    }
    
    render() {
        const { dropzoneActive } = this.state;
        const overlayStyle = {
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            padding: '2.5em 0',
            background: 'rgba(0,0,0,0.5)',
            textAlign: 'center',
            color: '#fff'
        };
        return (
            <Dropzone
                disableClick
                style={{position: "relative"}}
                accept="image/*"
                onDrop={this.onDrop.bind(this)}
                onDragEnter={this.onDragEnter.bind(this)}
                onDragLeave={this.onDragLeave.bind(this)}
            >
                { dropzoneActive && <div style={overlayStyle}>Drop files...</div> }
                <Row>
                    <div id="outer-container">
                
                        <Col md={3} className="no-padd" style={{zIndex: '99',}}>
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
                        <Col md={9} >
                        <div className="post-grid-items">
                            <div class="create-post-card">
                            <textarea rows="4" placeholder="What is in your mind?!" class="textarea" id="textarea"></textarea><br></br>
                                <button className="btn  btn-primary"><i className="fa fa-pencil"></i> Post</button>
                            </div>
                        </div>
                        <div className="post-grid">
                        
                        {
                                    this.state.posts.map((postData)=>{
                                        return(
                                            
                                            <div className="post-grid-items">

                                            <Post key={postData._id} userData={postData.user} text={postData.text} date={postData.date} imagePath={postData.image}/>

                                            </div>
                                        )
                                    })
                        }
                        </div>
                        </Col>
                        {/* <Col id="page-wrap" md={9} className="posts" >
                                {
                                    this.state.posts.map((postData)=>{
                                        return(
                                            <div className="post-grid">

                                            <Post key={postData._id} userData={postData.user} text={postData.text} date={postData.date} imagePath={postData.image}/>

                                            </div>
                                        )
                                    })
                                }
                            <Col md={6}>
                               
                                <button className="btn btn-grad-peach wow bounceIn registerBtn" type="button" onClick={this.prepareClusterPost.bind(this, {
                                    text: 'hey: ' + new Date().getTime()
                                })}>Add random Post</button>
                                {
                                    this.state.showLoadEarlierPosts &&
                                    <button className="btn btn-grad-peach wow bounceIn registerBtn" type="button" onClick={this.loadEarlierPosts.bind(this)}>Load earlier posts</button>
                                }
                            </Col>    
                            
                        </Col> */}
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
            </Dropzone>
        )
    }
}

export default withRouter(Profile);