import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './style/CustomNavbar.css'

export default class CustomNavbar extends Component {
  constructor(props){
    super(props);

    console.log(props);
  }

  render() {
    return (
      <Navbar collapseOnSelect className="navbar-light blue lighten-2">
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Sensorium</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
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
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
