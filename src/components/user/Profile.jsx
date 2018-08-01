import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import {Container, Row, Col, Jumbotron} from 'reactstrap';
import Fade from 'react-reveal/Fade';
import '../style/Home.css';
import '../style/style.css';
import '../style/responsive.css';
import './profileComponents/styles/profile.css';
import firebaseConf from './../../config/FirebaseConfig';
import Header from './profileComponents/Header';
import ProfileDetails from './profileComponents/ProfileDetails';
import Chat from './profileComponents/Chat';
import { ChatFeed, Message } from 'react-chat-ui'

class Profile extends Component {

    constructor(props, context) {
        super(props,context);
        console.log(props);
        this.state = {
            authUser: props.authUser,
            dateOfBirth: '',
            desiredClusters: {},
            name: 'Prateek',
            lastName:'Gupta',
            secondLastName: '',
            numSensatesInCluster: 0,
            photo: require('./profilepic.png'),
            messages: [
                new Message({
                id: 1,
                message: "Hii i am awesome", // I see you Prateek. I'm rolling my eyes...just so you know.
                }), // Gray bubble
                new Message({ id: 0, message: "I'm you -- the blue bubble!" }), // Blue bubble
            ],
            
        };

        this.db = firebaseConf.firestore();
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
                        this.chatListener = this.db.collection("clusters").doc(this.clusterChatId).collection('messages').onSnapshot((messages)=>{
                            console.log(messages);
                            var chatMessages = [];

                            messages.forEach((message)=> {
                                console.log(message)
                                console.log(message.data())
                                
                                chatMessages.push(message.data());
                                
                            });

                            this.setState({
                                chat: chatMessages
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
        this.db.collection("clusters").doc(this.clusterChatId).collection('messages').add({
            text: 'hey'
        }).then((res)=>{
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
    
    render() {

        return (
            <Row noGutters >

            <Col md={3} className="no-padd">
            <Header photo={this.state.photo}  name={this.state.name} lastName={this.state.lastName | ''} numSensatesInCluster={this.state.numSensatesInCluster} />
            </Col>
            
            <Col md={8} className="mt-5">
               {/* <Chat messages={this.state.messages} is_typing={this.state.is_typing} />  */}
            </Col>
            </Row>
        )
    }
}

export default withRouter(Profile);