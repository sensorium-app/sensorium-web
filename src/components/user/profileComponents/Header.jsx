import React from 'react';
import PropTypes from 'prop-types';
import ProfilePhoto from './ProfilePhoto';
import ProfileDetails from './ProfileDetails';
import {Container, Row, Col, Jumbotron} from 'reactstrap';
import Fade from 'react-reveal/Fade';
import '../../style/style.css';
import './styles/header.css';

const Header = (props) => (
  <header className="bg-grad-blue  profile-box">
    <div className="header-box">
        <Row>
        
            <Col md={5}>
                <ProfilePhoto image={props.photo} />
            </Col>
            <Col md={6}>
            <ProfileDetails lastname={props.lastname} name={props.name} numSensatesInCluster={props.numSensatesInCluster}/>
            </Col>
        
        </Row>
        <Row className="mt-3">
                <Col md={3}>
                    <a className="btn btn-info "><h5 className="white-text">Profile</h5></a>
                </Col>
                <Col md={3} >
                    <a className="btn btn-info "><h5 className="white-text">Cluster</h5></a>
                </Col>
                <Col md={3}>
                    <a className="btn btn-info "><h5 className="white-text">Settings</h5></a>
                </Col>
            
        </Row>
    </div>
  </header>
)

Header.propTypes = {
  photo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  numSensatesInCluster: PropTypes.number.isRequired
}

export default Header
