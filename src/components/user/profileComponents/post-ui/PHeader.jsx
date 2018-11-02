import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import styles from './styles';


const PHeader = (props) =>(
      <div className="header">
        <div className="settings-dropdown">
       
        </div>
        <span className="account-group" style={styles.accountGroup}>
          <img className="avatar" src={props.image} style={styles.avatar} />
          <strong className="fullname" style={styles.fullname}>{props.name}</strong>
          <p><strong><span style={styles.timestamp}>{props.timestamp}</span></strong></p>
        </span>
      </div>
    )

PHeader.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
}

export default PHeader
