import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import firebaseConf from './../../config/FirebaseConfig';

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
            numSensatesInCluster: 0
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
            <div className="container text-center">
                <br/><br/>
                <h1>Welcome {this.state.name}!</h1>
                <h2>Thank you for registering.</h2>
                <p>You have just been reborn into Sensorium...</p>
                <p>The psycellium is working hard to find your cluster. Be patient, the reward will be amazing.</p>
                <h4>Sensates found: <strong>{this.state.numSensatesInCluster}</strong></h4>
                <p>We will appreciate if you share this with your friends and family.</p>
                    <div className="a2a_kit a2a_kit_size_32 a2a_default_style">
                        <a className="a2a_dd" href="https://www.addtoany.com/share"></a>
                        <a className="a2a_button_facebook hidden-xs"></a>
                        <a className="a2a_button_twitter hidden-xs"></a>
                        <a className="a2a_button_google_plus hidden-xs"></a>
                        <a className="a2a_button_tumblr hidden-xs "></a>
                        <a className="a2a_button_reddit hidden-xs "></a>
                        <a className="a2a_button_whatsapp hidden-xs "></a>
                        <a className="a2a_button_google_gmail hidden-xs "></a>
                        <a className="a2a_button_digg hidden-xs "></a>
                        <a className="a2a_button_facebook_messenger hidden-xs "></a>
                        <a className="a2a_button_kik hidden-xs "></a>
                        <a className="a2a_button_myspace hidden-xs "></a>
                        <a className="a2a_button_viber hidden-xs "></a>
                        <a className="a2a_button_wechat hidden-xs "></a>
                        <a className="a2a_button_yahoo_messenger hidden-xs "></a>
                        <a className="a2a_button_aol_mail hidden-xs "></a>
                    </div>
                
                <br />
                <a className="btn btn-grad-peach" onClick={this.logout.bind(this)}>Logout</a>
                <a className="btn btn-grad-peach" onClick={this.goBack.bind(this)}>Go back to home page</a>
            </div>
        )
    }
}

export default withRouter(Profile);