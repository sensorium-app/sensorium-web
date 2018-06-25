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

  render() {
    return (
      <Navbar collapseOnSelect className="navbar-light blue lighten-2">

        <Navbar.Header>
          <Navbar.Toggle />

          <Navbar.Brand>
            <Link to="/"><img clasname="logo" src="/assets/sensorium.svg"/></Link>
          </Navbar.Brand>

          {this.state.authUser ? null :
          <Fade right>
              <a className="btn btn-grad-peach wow bounceIn loginBtn" href="/login" role="button" >Login</a>
          </Fade>
          }
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} componentClass={Link} href="/" to="/">
              Home
            </NavItem>
            <NavItem eventKey={2} componentClass={Link} href="/about" to="/about">
              About
            </NavItem>
            <NavItem eventKey={3} componentClass={Link} href="/news" to="/news">
              News
            </NavItem>
            {!this.state.authUser ? null : <NavItem eventKey={4} componentClass={Link} href="/profile" to="/profile">
              Profile
            </NavItem>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
