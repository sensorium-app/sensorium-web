import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import styles from './styles';


class PHeader extends Component{
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  render(){
    return(
      <div className="header">
      <span className="account-group" style={styles.accountGroup}>
        <img className="avatar" src={this.props.image} style={styles.avatar} />
        <strong className="fullname" style={styles.fullname}>{this.props.name}</strong>
        <p><strong><span style={styles.timestamp}>{this.props.timestamp}</span></strong></p>
        
      </span>
      <div className="settings-dropdown">
        {
          this.props.userIsOwner &&
          <div>
            <i className="fa fa-trash" onClick={()=> {this.props.deletePost(); this.props.togglePostDetailModal() } }></i>
          </div>
        }
      </div>

      
    </div>
    )
  } 
}


PHeader.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
}

export default PHeader

