import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styles from './styles';

const PFooter = (props) =>(
    <div className="Post-caption">
         <p style={styles.postcaption}>{props.postcaption}</p>
    </div>

    )

PFooter.propTypes = {
  postcaption: PropTypes.string.isRequired
}

export default PFooter

