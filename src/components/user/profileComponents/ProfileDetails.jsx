import React from 'react';
import PropTypes from 'prop-types';
import ProfilePhoto from './ProfilePhoto';
import {Container, Row, Col, Jumbotron} from 'reactstrap';
import Fade from 'react-reveal/Fade';
import '../../style/style.css';
import './styles/header.css';

const ProfileDetails = (props) => (
    <div className="details-text">
        <h1>{props.Name}</h1>
        <h1>{props.lastname}</h1>
    </div>
    )

ProfileDetails.propTypes = {
  name: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired
}

export default ProfileDetails
