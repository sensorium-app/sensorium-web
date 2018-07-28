import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import {Container, Row, Col, Jumbotron} from 'reactstrap';
import Fade from 'react-reveal/Fade';
import '../style/Home.css';
import '../style/style.css';
import '../style/responsive.css';
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
            dateTimeOfBirth: '',
            desiredClusters: {},
            name: 'Prateek',
            lastName:'Gupta',
            secondLastName: '',
            numSensatesInCluster: 0,
            photo: require('./profilepic.png'),
            messages: [
                new Message({
                id: 1,
                message: "Hii i am awesome",
                }), // Gray bubble
                new Message({ id: 0, message: "I'm you -- the blue bubble!" }), // Blue bubble
            ],
            
        };

        this.db = firebaseConf.firestore();

        this.db.collection("sensates").where("uid", "==", this.state.authUser.uid)
        .get()
        .then((querySnapshot) =>{
            querySnapshot.forEach((doc)=>{
                const sensate = doc.data();

                this.db.collection("clusters").where("sensates."+doc.id, "==", true)
                .get()
                .then((querySnapshot) =>{
                    querySnapshot.forEach((doc)=>{
                        const sensates = doc.data();
                        console.log(sensates.sensates);
                        let numSensatesInCluster = 0;
                        console.log(numSensatesInCluster);
                        Object.keys(sensates.sensates).forEach((sensateId)=>{
                            console.log(sensateId)
                            if(sensates.sensates[sensateId]){
                                console.log(numSensatesInCluster);
                                numSensatesInCluster = numSensatesInCluster + 1;
                            }
                        });
                        //subtract his own reference
                        numSensatesInCluster = numSensatesInCluster - 1;
                        this.setState({numSensatesInCluster: numSensatesInCluster});

                    });
                })
                .catch((error) =>{
                    console.log("Error getting cluster: ", error);
                });

                this.setState(sensate);
                
            });
        })
        .catch((error) =>{
            console.log("Error getting sensate: ", error);
        });
        
    }

    componentDidMount(){
        
    }

    componentDidUpdate(prevProps) {
        if (this.props.path === this.props.location.pathname && this.props.location.pathname !== prevProps.location.pathname) {
          window.scrollTo(0, 0)
        }
    }

    goBack(){
        this.props.history.push("/");
    }

    logout(){
        firebaseConf.auth().signOut().then(()=> {
            this.props.history.push("/");
        }).catch((error)=> {
            console.log(error);
            alert('Error on signout');
            this.props.history.push("/");
        });
    }
    
    render() {

        return (
            <div>
            <Row>
            {/* <a className="btn btn-grad-peach" onClick={this.logout.bind(this)}>Logout</a>
            <a className="btn btn-grad-peach" onClick={this.goBack.bind(this)}>Go back to home page</a> */}
            <Col>
            <Header photo={this.state.photo}  name={this.state.name} lastName={this.state.lastName} numSensatesInCluster={this.state.numSensatesInCluster} />
            </Col>
            <Col md={4} className="p-5">
            <Chat messages={this.state.messages} is_typing={this.state.is_typing} />
            </Col>
            </Row>
            </div>
        )
    }
}

export default withRouter(Profile);