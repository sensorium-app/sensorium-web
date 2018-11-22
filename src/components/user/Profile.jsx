import React, { Component, ReactDOM } from 'react'
import { BrowserRouter as Router,Route,Redirect,withRouter, Link } from 'react-router-dom';
import '../style/Home.css';
import '../style/responsive.css';
import './profileComponents/styles/profile.css';
import { Row, Col } from 'reactstrap';
import firebaseConf, {firebase} from './../../config/FirebaseConfig';
import ProfileMenu from './profileComponents/ProfileMenu';
import EmailVerification from './profileComponents/email-verification/EmailVerification';
import ChatWrapper from './profileComponents/chat-ui/ChatWrapper';
import PostsWrapper from './profileComponents/post-ui/PostsWrapper';

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
            clusterId: '',
        };

        this.db = firebaseConf.firestore();
        const settings = { timestampsInSnapshots: true};
        this.db.settings(settings);

        this.sensateListener;
        this.clusterListener;

        this.sensatesQueryArray = [];
        this.sensatesList = [];
        
    }

    componentDidUpdate(prevProps) {
        if (this.props.path === this.props.location.pathname && this.props.location.pathname !== prevProps.location.pathname) {
          window.scrollTo(0, 0)
        }
    }

    componentWillUnmount(){
        // Unsubscribe from all listeners to avoid memory leaks
        if(this.sensateListener){
            this.sensateListener();
        }
        if(this.clusterListener){
            this.clusterListener();
        }
    }

    componentDidMount(){

        if(this.props.authUser && this.props.authUser.emailVerified){
            this.initListeners();
        }
    }

    initListeners(){
        this.sensateListener = this.db.collection("sensies").doc(this.state.authUser.uid)
        .onSnapshot((doc) =>{
            if(doc.exists){
                const sensate = doc.data();
                
                this.clusterListener = this.db.collection("clusters").where("sensates."+doc.id, "==", true)
                .onSnapshot((querySnapshot) =>{
                    querySnapshot.forEach((doc)=>{
                        const clusterData = doc.data();

                        this.setState({
                            clusterId: doc.id,
                        });

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
                        // Subtract the user's own reference
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

                    });
                });

                this.setState(sensate);
                
            }else{
                console.log("Sensate doesn't exist");
                alert("Sensate doesn't exist or an error ocurred");
            }
        });
    }
    
    render() {

        if(this.props.authUser && !this.props.authUser.emailVerified){
            return <EmailVerification authUser={this.props.authUser} />
        }

        return (
            <div>
                <Row>
                    
                    <div id="outer-container">
                
                        <Col style={this.props.bigScreen ? {opacity: '.99'} : null}>
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
                        <Col md={9} id="page-wrap">

                            <Route exact path={this.props.match.path} render={()=>
                                this.state.clusterId && 
                                    <PostsWrapper authUser={this.props.authUser} clusterId={this.state.clusterId} userName={this.state.name} userAvatar={this.state.photo} />
                            } />
                        
                        </Col>

                            {
                                this.state.clusterId && this.props.authUser && 
                                    <ChatWrapper authUser={this.props.authUser} clusterId={this.state.clusterId} userName={this.state.name} userAvatar={this.state.photo} />
                            }

                    </div>
                </Row>
            </div>
        )
    }
}

export default withRouter(Profile);