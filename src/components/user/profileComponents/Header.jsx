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
        <Col md={2}>
            <ProfilePhoto image={props.photo} />
            <ProfileDetails name={props.name} lastname={props.lastname} numSensatesInCluster={props.numSensatesInCluster}/>
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
