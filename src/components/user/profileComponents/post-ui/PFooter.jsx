import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styles from './styles';

const PFooter = (props) =>(
    <div className="Post-caption">
         <strong className="fullname" style={styles.fullname}>{props.name}</strong>
         <p style={styles.postCaption}>Est ipsum sunt laboris eiusmod velit id est consequat sit ea Lorem ea nisi. Occaecat occaecat laborum est nulla ex consequat deserunt. Velit elit aute minim enim tempor voluptate commodo reprehenderit</p>
    </div>

    )

PFooter.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

export default PFooter

