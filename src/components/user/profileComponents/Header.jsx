import React from 'react';
import PropTypes from 'prop-types';
import ProfilePhoto from './ProfilePhoto';
import ProfileDetails from './ProfileDetails';
import {Container, Row, Col, Jumbotron} from 'reactstrap';
import Fade from 'react-reveal/Fade';
import '../../style/style.css';
import './styles/header.css';

const Header = (props) => (
    <div className="profile-bar">
    <div className="avatar">
        <ProfilePhoto image={props.photo}  />    
    </div>
    <div className="user-name">
        <ProfileDetails lastname={props.lastname} name={props.name} numSensatesInCluster={props.numSensatesInCluster}/>
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
        <h3>Cluster name</h3>
        <div className="cluster-members">
                <ul>
                    <li><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0Zq2XTzXmYGmzA9A34g00s7dDZQRKZtot0NGbja29zaDptKSW" />Member 1</li>
                    <li><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0Zq2XTzXmYGmzA9A34g00s7dDZQRKZtot0NGbja29zaDptKSW" />Member 2</li>
                    <li><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0Zq2XTzXmYGmzA9A34g00s7dDZQRKZtot0NGbja29zaDptKSW" />Member 3</li>
                    <li><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0Zq2XTzXmYGmzA9A34g00s7dDZQRKZtot0NGbja29zaDptKSW" />Member 4</li>
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

Header.propTypes = {
  photo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  numSensatesInCluster: PropTypes.number.isRequired
}

export default Header
