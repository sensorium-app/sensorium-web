import React, { Component } from "react";
import PropTypes from 'prop-types';
import{Row} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import styles from './styles';
import './style/post.css';
const PFooter = (props) =>(
    <div className="Post-caption">
         <p style={styles.postCaption}>{props.postcaption}</p>

        <div className="Post-console">
            <i class="fa fa-reply"></i>
            <i class="fa fa-heart"></i>
        </div>
        
    </div>
    
     
    
    

    )

PFooter.propTypes = {
  postcaption: PropTypes.string.isRequired
}

export default PFooter

