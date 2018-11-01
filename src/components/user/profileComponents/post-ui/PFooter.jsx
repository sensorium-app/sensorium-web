import React, { Component } from "react";
import PropTypes from 'prop-types';
import styles from './styles';
import './style/post.css';

const PFooter = (props) =>(

    <div className="Post-caption">
         <p style={styles.postCaption}>{props.postcaption}</p>

        <div className="Post-console">
            <i className="fa fa-reply"></i>
            <i className="fa fa-heart"></i>
        </div>
        
    </div>

)

PFooter.propTypes = {
  postcaption: PropTypes.string.isRequired
}

export default PFooter

