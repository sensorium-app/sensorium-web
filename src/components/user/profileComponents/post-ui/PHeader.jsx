import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import styles from './styles';


const PHeader = (props) =>(
      <div className="header">
        <span className="account-group" style={styles.accountGroup}>
          <img className="avatar" src={props.image} style={styles.avatar} />
          <strong className="fullname" style={styles.fullname}>{props.name}</strong>
          <p><strong><span style={styles.timestamp}>{props.timestamp}</span></strong></p>
        </span>
        <div className="settings-dropdown">
          {
            props.userIsOwner &&
            <div>
              <i className="fa fa-trash" onClick={()=> {props.deletePost(); props.togglePostDetailModal() } }></i>
            </div>
          }
        </div>
      </div>
    )

PHeader.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
}

export default PHeader

