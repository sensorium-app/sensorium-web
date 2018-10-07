import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styles from './styles';

const PFooter = (props) =>(
    <div className="Post-caption">
         <strong className="fullname" style={styles.fullname}>{props.name}&nbsp;<span style={styles.timestamp}>{props.timestamp}</span></strong>
         <p style={styles.postcaption}>{props.postcaption}</p>
    </div>

    )

PFooter.propTypes = {
  timestamp: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  postcaption: PropTypes.string.isRequired
}

export default PFooter

