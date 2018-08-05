import React, { Component, ReactDOM } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import {Container, Row, Col, Jumbotron} from 'reactstrap';
import Fade from 'react-reveal/Fade';
import '../style/Home.css';
import '../style/style.css';
import '../style/responsive.css';
import './profileComponents/styles/profile.css';
import firebaseConf, {firebase} from './../../config/FirebaseConfig';
import Header from './profileComponents/Header';
import ProfileDetails from './profileComponents/ProfileDetails';
import Chat from './profileComponents/Chat';
import { Input, Button } from 'react-chat-elements';

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

        this.sensateListener = this.db.collection("sensies").doc(this.state.authUser.uid)
        .onSnapshot((doc) =>{
            if(doc.exists){
                const sensate = doc.data();
                console.log(sensate);
                this.clusterListener = this.db.collection("clusters").where("sensates."+doc.id, "==", true)
                .onSnapshot((querySnapshot) =>{
                    querySnapshot.forEach((doc)=>{
                        const clusterData = doc.data();
                        console.log(clusterData.sensates);

                        let numSensatesInCluster = 0;
                        console.log(numSensatesInCluster);
                        Object.keys(clusterData.sensates).forEach((sensateId)=>{
                            console.log(sensateId)
                            if(clusterData.sensates[sensateId]){
                                console.log(numSensatesInCluster);
                                numSensatesInCluster = numSensatesInCluster + 1;
                            }
                        });
                        //subtract his own reference
                        numSensatesInCluster = numSensatesInCluster - 1;
                        this.setState({numSensatesInCluster: numSensatesInCluster});

                        //Cluster chat
                        this.clusterChatId = doc.id;
                        this.chatListener = this.db.collection("clusters").doc(this.clusterChatId).collection('messages')
                        .orderBy("date", "desc").limit(50)
                        .onSnapshot((messages)=>{
                            console.log(messages);
                            var chatMessages = [];

                            /*messages.slice().reverse().forEach((message)=> {
                                console.log(message);
                            })*/

                            messages.forEach((message)=> {
                                console.log(message)
                                var msg = message.data();
                                console.log(msg)

                                //position
                                if(msg.user._id === this.state.authUser.uid){
                                    msg['position'] = 'right';
                                }else{
                                    msg['position'] = 'left';
                                }
                                console.log()
                                if(msg.date && msg.date.seconds){
                                    console.log(moment(msg.date.seconds * 1000))
                                    console.log(moment(moment(msg.date.seconds * 1000)).fromNow())
                                    msg['dateString'] = moment(moment(msg.date.seconds * 1000)).fromNow();
                                    msg['date'] = moment(msg.date.seconds * 1000);
                                }
                                msg['title'] = msg.user.name;
                                msg['titleColor'] = 'blue'
                                //msg['copiableDate'] = true;

                                chatMessages.push(msg);
                                
                            });

                            var count = 0;
                            var chatMessagesReversed = [];
                            for(var i=chatMessages.length-1; i>=0; i--){
                                count = count + 1;
                                console.log(i, count)
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

    sendMessageToChat(){
        const serverDate = firebase.firestore.FieldValue.serverTimestamp();
        console.log(serverDate);
        const date = new Date();
        const dateNumber = date.getTime();
        const message = {
            "_id": dateNumber,
            "text": this.chatText.state.value,
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
        console.log(message, this.chatText.state.value)
        this.chatText.clear();
        this.db.collection("clusters").doc(this.clusterChatId).collection('messages').add(message).then((res)=>{
            console.log(res, 'update state');
        }).catch((err)=>{
            console.log(err);
        });
    }

    componentDidMount(){
        //why isn't this working?
        //https://stackoverflow.com/questions/28889826/react-set-focus-on-input-after-render
        //this.chatText.getDOMNode().focus();
        //ReactDOM.findDOMNode(this.chatText).focus()
    }

    componentDidUpdate(prevProps) {
        if (this.props.path === this.props.location.pathname && this.props.location.pathname !== prevProps.location.pathname) {
          window.scrollTo(0, 0)
        }
    }

    logout(){
        //unsubscribe from all listeners to avoid memory leaks
        this.sensateListener();
        this.clusterListener();
        if(this.chatListener){
            this.chatListener();
        }

        firebaseConf.auth().signOut().then(()=> {
            
            this.props.history.push("/");

        }).catch((error)=> {
            console.log(error);
            alert('An error occurred during sign-out.');
            this.props.history.push("/");
        });
    }

    onScroll(e){
        console.log(e)
    }
    
    render() {

        return (
            <Row noGutters >

                <Col md={3} className="no-padd">
                    <Header photo={this.state.photo}  name={this.state.name} lastName={this.state.lastName | ''} numSensatesInCluster={this.state.numSensatesInCluster} />
                </Col>
                
                <Col md={9} className="mt-7">

                        <Chat messages={this.state.messages}/>

                    <div className='input'>
                    <Input
                            placeholder="Type your message"
                            defaultValue=""
                            
                            ref={(input) => { this.chatText = input; }} 
                            multiline={true}
                            // buttonsFloat='left'
                            onKeyPress={(e) => {
                                if (e.shiftKey && e.charCode === 13) {
                                    return true;
                                }
                                if (e.charCode === 13) {
                                    this.sendMessageToChat();
                                    e.preventDefault();
                                    return false;
                                }
                            }}
                            rightButtons={
                                <Button
                                    text='Send'
                                    type='outline'
                                    color='black'
                                    onClick={this.sendMessageToChat.bind(this)} />
                            } />
                    </div>
                </Col>
            </Row>
        )
    }
}

export default withRouter(Profile);