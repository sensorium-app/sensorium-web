import React from 'react';
import PropTypes from 'prop-types';
import ProfilePhoto from './ProfilePhoto';
import ProfileDetails from './ProfileDetails';
import {Container, Row, Col, Jumbotron} from 'reactstrap';
import Fade from 'react-reveal/Fade';
import '../../style/style.css';
import './styles/header.css';

const Header = (props) => (
    <div class="profile-bar">
    <div class="avatar">
        <ProfilePhoto image={props.photo} />    
    </div>
    <div class="user-name">
        <ProfileDetails lastname={props.lastname} name={props.name} numSensatesInCluster={props.numSensatesInCluster}/>
    </div>
    <div class="profile-buttons">
        <a class="btn profile-btn-grad"><i class="fa fa-home"></i></a>
        <a class="btn profile-btn-grad"><i class="fa fa-infinity"></i></a>
        <a class="btn profile-btn-grad"><i class="fa fa-bell"></i></a>
        <a class="btn profile-btn-grad"><i class="fa fa-comment-alt"></i></a>
        <a class="btn profile-btn-grad"><i class="fa fa-cog"></i></a>
    </div>
    <div class="cluster-name">
        <h3>clusetr name</h3>
        <div class="cluster-members">
                <ul>
                    <li><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0Zq2XTzXmYGmzA9A34g00s7dDZQRKZtot0NGbja29zaDptKSW" />Member 1</li>
                    <li><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0Zq2XTzXmYGmzA9A34g00s7dDZQRKZtot0NGbja29zaDptKSW" />member 2</li>
                    <li><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0Zq2XTzXmYGmzA9A34g00s7dDZQRKZtot0NGbja29zaDptKSW" />member 3</li>
                    <li><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0Zq2XTzXmYGmzA9A34g00s7dDZQRKZtot0NGbja29zaDptKSW" />member 4</li>
                </ul>
            </div>
    </div>
    
    <div class="archiplago">
           <h3>archiplago</h3>
           
    <div class="archilago-members">
            <ul>
                    <li><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0Zq2XTzXmYGmzA9A34g00s7dDZQRKZtot0NGbja29zaDptKSW" />Member 1</li>
                    <li><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0Zq2XTzXmYGmzA9A34g00s7dDZQRKZtot0NGbja29zaDptKSW" />member 2</li>
                    <li><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0Zq2XTzXmYGmzA9A34g00s7dDZQRKZtot0NGbja29zaDptKSW" />member 3</li>
                    <li><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0Zq2XTzXmYGmzA9A34g00s7dDZQRKZtot0NGbja29zaDptKSW" />member 4</li>
                </ul>
    </div>
    </div>
</div>
  
)

Header.propTypes = {
  photo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  numSensatesInCluster: PropTypes.number.isRequired
}

export default Header
