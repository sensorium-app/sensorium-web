import React, { Component, ReactDOM } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import {Container, Row, Col, Jumbotron} from 'reactstrap';
import Fade from 'react-reveal/Fade';
import '../style/Home.css';
import '../style/style.css';
import '../style/responsive.css';
import './profileComponents/styles/settings.css';

import firebaseConf, {firebase} from './../../config/FirebaseConfig';
import ProfileDetails from './profileComponents/ProfileDetails';
import ProfileMenu from './profileComponents/ProfileMenu';


import moment from 'moment';

class Settings extends Component {
    
    
    render() {

        return (
           <Row>
            
           </Row>
        )
    }
}

export default withRouter(Settings);