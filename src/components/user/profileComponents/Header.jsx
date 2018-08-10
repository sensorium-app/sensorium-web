import React,{Component} from 'react';
import PropTypes from 'prop-types';
import ProfilePhoto from './ProfilePhoto';
import ProfileDetails from './ProfileDetails';
import '../../style/style.css';
import './styles/header.css';

class Header extends Component {

    constructor(props, context) {
        super(props,context);
        this.state={
            sensatesInClusterData: this.props.sensatesInClusterData
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            sensatesInClusterData: nextProps.sensatesInClusterData
        });
    }

    clusterMemberList(){
        const data = this.state.sensatesInClusterData;
        
        return data.map(clusterMember => {
            return (
                <li key={clusterMember.uid}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0Zq2XTzXmYGmzA9A34g00s7dDZQRKZtot0NGbja29zaDptKSW" /> 
                    { ' ' + clusterMember.name }
                </li>
            );
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
                    <a className="profile-btn-grad"><span className="lnr lnr-power-switch"></span></a>

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
                                <li><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0Zq2XTzXmYGmzA9A34g00s7dDZQRKZtot0NGbja29zaDptKSW" />Member 1</li>
                                <li><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0Zq2XTzXmYGmzA9A34g00s7dDZQRKZtot0NGbja29zaDptKSW" />Member 2</li>
                                <li><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0Zq2XTzXmYGmzA9A34g00s7dDZQRKZtot0NGbja29zaDptKSW" />Member 3</li>
                                <li><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0Zq2XTzXmYGmzA9A34g00s7dDZQRKZtot0NGbja29zaDptKSW" />Member 4</li>
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

export default Header
