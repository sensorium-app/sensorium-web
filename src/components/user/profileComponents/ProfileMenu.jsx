import React, { Component } from 'react'
import Header from './Header';
import { push as Menu } from 'react-burger-menu'

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
        <Menu isOpen={ this.props.menuOpen } noOverlay={this.props.bigScreen} 
          onStateChange={(state) => this.handleStateChange(state)} pageWrapId={ "page-wrap" } 
          outerContainerId={ "outer-container" } customBurgerIcon={ false } customCrossIcon={ false }>
          <Header photo={this.props.photo} name={this.props.name} lastName={this.props.lastName | ''} 
            sensatesInClusterData={this.props.sensatesInClusterData} 
            numSensatesInCluster={this.props.numSensatesInCluster} />
        </Menu>
      );
    }
}

export default ProfileMenu;