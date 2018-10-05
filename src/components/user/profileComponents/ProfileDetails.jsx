import React from 'react';
import PropTypes from 'prop-types';
import ProfilePhoto from './ProfilePhoto';
import {Container, Row, Col, Jumbotron} from 'reactstrap';
import Fade from 'react-reveal/Fade';
import '../../style/style.css';
import './styles/profiledetails.css';

const ProfileDetails = (props) => (
    <div className="details-text">
        <h3>{props.name} {props.lastname}</h3>
        <p> {props.numSensatesInCluster}</p>
    </div>
    )

ProfileDetails.propTypes = {
    name: PropTypes.string.isRequired,
}

export default ProfileDetails
