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
            messages: []
        };

        this.db = firebaseConf.firestore();
        const settings = { timestampsInSnapshots: true};
        this.db.settings(settings);

        this.clusterChatId = '';
        this.sensateListener;
        this.clusterListener; 
        this.chatListener;

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
                        .orderBy("date", "desc").limit(50)
                        .onSnapshot((messages)=>{
                            var chatMessages = [];

                            messages.forEach((message)=> {
                                var msg = message.data();

                                //position
                                if(msg.user._id === this.state.authUser.uid){
                                    msg['isOwn'] = true;
                                }else{
                                    msg['isOwn'] = false;
                                }
                                console.log()
                                if(msg.date && msg.date.seconds){
                                    msg['dateString'] = moment(msg.date.seconds * 1000).format('hh:mm a');
                                    msg['date'] = moment(msg.date.seconds * 1000);
                                }
                                msg['title'] = msg.user.name;
                                msg['titleColor'] = 'blue'

                                chatMessages.push(msg);
                                
                            });

                            var count = 0;
                            var chatMessagesReversed = [];
                            for(var i=chatMessages.length-1; i>=0; i--){
                                count = count + 1;
                                chatMessagesReversed.push(chatMessages[i])
                            }
                            
                            this.setState({
                                messages: chatMessagesReversed
                            })
                              
                        });

                    });
                });

                this.setState(sensate);
                
            }else{
                console.log("Sensate doesn't exist");
                alert("Sensate doesn't exist");
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
                <div id="page-wrap"></div>
                    <FixedWrapper.Root>
                        <FixedWrapper.Maximized>
                            <Maximized {...this.props} messages={this.state.messages}
                                chatText={this.chatText} sendMessageToChat={this.sendMessageToChat.bind(this)} />
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