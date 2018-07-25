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
class Profile extends Component {

    constructor(props, context) {
        super(props,context);
        console.log(props);
        this.state = {
            authUser: props.authUser,
            dateTimeOfBirth: '',
            desiredClusters: {},
            name: '',
            lastName:'',
            secondLastName: '',
            numSensatesInCluster: 0,
            photo: require('./jane-doe.jpg'),

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
            
            // <a className="btn btn-grad-peach" onClick={this.logout.bind(this)}>Logout</a>
            // <a className="btn btn-grad-peach" onClick={this.goBack.bind(this)}>Go back to home page</a>
            <Header photo={this.state.photo}  />
            <
        )
    }
}

export default withRouter(Profile);