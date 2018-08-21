import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './style/CustomNavbar.css'
import Rotate from 'react-reveal/Rotate';
import Fade from 'react-reveal/Fade';

export default class CustomNavbar extends Component {
  constructor(props) {
    super(props);

    console.log(props);

    this.state = {
      authUser: props.authUser
    };
  }

  menuController(event){
    console.log(event)
    this.props.menuControl();
  }

  render() {
    return (
      <Navbar collapseOnSelect className="navbar-light blue lighten-2">

        <Navbar.Header>
          {this.state.authUser ? 
            <button type="button" className="navbar-toggle collapsed" onClick={this.menuController.bind(this)}>
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            </button> : 
              <Navbar.Toggle /> }

          <Navbar.Brand>
            <Link to="/"><img className="logo" src="/assets/sensorium.svg" alt="logo" /></Link>
          </Navbar.Brand>

          {this.state.authUser ? null :
          <Fade right>
              <a className="btn btn-grad-peach wow bounceIn loginBtn" href="/login" role="button" >Login</a>
          </Fade>
          }
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav pullRight>
           {/* {!this.state.authUser? 
            <NavItem eventKey={1} componentClass={Link} href="/" to="/">
              Home
            </NavItem>:null}
           {!this.state.authUser ?  <NavItem eventKey={2} componentClass={Link} href="/about" to="/about">
              About
            </NavItem>:null}
            
            {!this.state.authUser ?<NavItem eventKey={3} componentClass={Link} href="/news" to="/news">
              News
            </NavItem>:null}


            {!this.state.authUser ? null : <NavItem eventKey={4} componentClass={Link} href="/profile" to="/profile">
              Home
            </NavItem>}
            {
            !this.state.authUser?null:<NavItem eventKey={4} componentClass={Link} href="/profile" to="/profile">
              Notifications
            </NavItem>
            }
            {
            !this.state.authUser?null:<NavItem eventKey={4} componentClass={Link} href="/profile" to="/profile">
              Messages
            </NavItem>
            }
            {
            !this.state.authUser?null:<NavItem eventKey={4} componentClass={Link} href="/profile" to="/profile">
              Explore
            </NavItem>
            } */}
            {
            !this.state.authUser?null:<NavItem eventKey={4} componentClass={Link} href="/profile" to="/profile">
              Settings
            </NavItem>
            }

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
