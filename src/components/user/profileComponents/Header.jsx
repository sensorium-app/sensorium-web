import React from 'react';
import PropTypes from 'prop-types';
import ProfilePhoto from './ProfilePhoto';
import ProfileDetails from './ProfileDetails';
import {Container, Row, Col, Jumbotron} from 'reactstrap';
import Fade from 'react-reveal/Fade';
import '../../style/style.css';
import './styles/header.css';

const Header = (props) => (
  <header className="bg-grad-blue">
    <div className="header-box">
        <Container>
        <Col md={3}>
            <Col md={6}>
                <ProfilePhoto image={props.photo} />
            </Col>
            <Col md={6}>
            <ProfileDetails name={props.name} lastname={props.lastname} numSensatesInCluster={props.numSensatesInCluster}/>
            </Col>
        </Col>
        <Col md={5}></Col>
        <Col md={4}>
            <Row>
                <Col xs={6} md={6} sm={6}>
                {/* this is supposed to be status either if the dude is online or not */}
                <h5>cluster memeber1 <i className="fa fa-circle"></i></h5>
                <h5>cluster memeber1</h5>
                <h5>cluster memeber1</h5>
                <h5>cluster memeber1 <i className="fa fa-circle"></i></h5>
                </Col>
                
                <Col xs={6} md={6} sm={6}>
                <h5>cluster memeber1</h5>
                <h5>cluster memeber1</h5>
                <h5>cluster memeber1 <i className="fa fa-circle"></i></h5>
                <h5>cluster memeber1</h5>

                </Col>
            </Row>
        </Col>
        </Container>
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
