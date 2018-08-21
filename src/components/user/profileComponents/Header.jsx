import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ProfilePhoto from './ProfilePhoto';
import ProfileDetails from './ProfileDetails';
import '../../style/style.css';
import './styles/header.css';
import Home from '../../Home';
import firebaseConf, {firebase} from './../../../config/FirebaseConfig';

class Header extends Component {

    constructor(props, context) {
        super(props,context);
    }

    clusterMemberList(){
        const data = this.props.sensatesInClusterData;
        
        return data.map(clusterMember => {
            return (
                <li key={clusterMember.uid}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0Zq2XTzXmYGmzA9A34g00s7dDZQRKZtot0NGbja29zaDptKSW" alt="Default profile" /> 
                    { ' ' + clusterMember.name }
                </li>
            );
        });
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
            <div className="profile-bar">
                <div className="avatar">
                    <ProfilePhoto image={this.props.photo}  />    
                </div>
                <div className="user-name">
                    <ProfileDetails lastname={this.props.lastname} name={this.props.name} numSensatesInCluster={this.props.numSensatesInCluster}/>
                </div>
                <div className="profile-buttons mt-5">
                    <a className="profile-btn-grad"><span className="lnr lnr-home"></span> </a>
                    <a className="profile-btn-grad"><span className="lnr lnr-envelope"></span></a>
                    <a className="profile-btn-grad"><span className="lnr lnr-user"></span></a>
                    <a className="profile-btn-grad"><span className="lnr lnr-users"></span></a>
                    <a className="profile-btn-grad"><span className="lnr lnr-cog"></span> </a>
                    <a className="profile-btn-grad" onClick={this.logout.bind(this)}><span className="lnr lnr-power-switch"></span></a>

                </div>
                <div className="cluster-name">
                    <h3>Cluster members</h3>
                    <div className="cluster-members">
                        <ul>
                            {
                                this.clusterMemberList()
                            }
                        </ul>
                    </div>
                </div>
                
                <div className="archipelago">
                    <h3>Archipelago</h3>
                    
                <div className="archipelago-members">
                        <ul>
                            <li><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0Zq2XTzXmYGmzA9A34g00s7dDZQRKZtot0NGbja29zaDptKSW" alt="Member icon"/>Member 1</li>
                            <li><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0Zq2XTzXmYGmzA9A34g00s7dDZQRKZtot0NGbja29zaDptKSW" alt="Member icon"/>Member 2</li>
                            <li><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0Zq2XTzXmYGmzA9A34g00s7dDZQRKZtot0NGbja29zaDptKSW" alt="Member icon"/>Member 3</li>
                            <li><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0Zq2XTzXmYGmzA9A34g00s7dDZQRKZtot0NGbja29zaDptKSW" alt="Member icon"/>Member 4</li>
                        </ul>
                </div>
                </div>
            </div>
        )
    }
}

Header.propTypes = {
  photo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  numSensatesInCluster: PropTypes.number.isRequired
}

export default withRouter(Header);