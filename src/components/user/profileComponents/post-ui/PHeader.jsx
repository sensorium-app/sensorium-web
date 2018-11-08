import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
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
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  render(){
    return(
      <div className="header">
      <span className="accountGroup" style={styles.accountGroup}>
        <img className="avatar" src={this.props.image} style={styles.avatar} />
        <strong className="fullname" style={styles.fullname}>{this.props.name}</strong>
        <p><strong><span style={styles.timestamp}>{this.props.timestamp}</span></strong></p>
        
      </span>
      <div className="settingsDropdown">
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle
          tag="span"
          onClick={this.toggle}
          data-toggle="dropdown"
          aria-expanded={this.state.dropdownOpen}
        >
          <i className="fa fa-angle-down"></i>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu">
        <div onClick={this.toggle}>

          {
            this.props.userIsOwner && !this.props.editMode &&
            <p onClick={ ()=> this.props.toggleEditMode() }>
              <i className="fa fa-edit"></i> Edit Post
            </p>
          }
               
        </div>
         
          {/* delete Post */}
          <div onClick={this.toggle}>
            {
            this.props.userIsOwner &&
            <p onClick={()=> {this.props.deletePost(); } }>
              <i className="fa fa-trash" ></i> Delete Post
            </p>
            } 
          </div>
         
         
        </DropdownMenu>
      </Dropdown>

        
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

