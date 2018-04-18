import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <div className="container text-center">
        <div className="row">
              <nav className="navbar navbar-toggleable-md">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="container">
                  <Link className="navbar-brand" to="/">{this.props.title}</Link>
                  <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav ml-auto">
                      <li className="nav-item active">
                        <Link className="nav-link" to="/">{this.props.link1}<span className="sr-only">(current)</span></Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/about">{this.props.link2}</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/contact">{this.props.link3}</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
        </div>
      </  div>
    );
  }
}

export default Navbar;
