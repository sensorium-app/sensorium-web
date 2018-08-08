import React, { Component } from 'react'
import Header from './Header';
import { slide as Menu } from 'react-burger-menu'

class ProfileMenu extends React.Component {
    constructor(props) {
      super(props);
    }

    handleStateChange(event){
      console.log(event)
      this.props.handleStateChange(event);
    }
  
    render() {
      return (
        <Menu isOpen={ this.props.menuOpen } noOverlay={this.props.bigScreen} onStateChange={(state) => this.handleStateChange(state)}>
          <Header photo={this.props.photo} name={this.props.name} lastName={this.props.lastName | ''} numSensatesInCluster={this.props.numSensatesInCluster} />
        </Menu>
      );
    }
}

export default ProfileMenu;