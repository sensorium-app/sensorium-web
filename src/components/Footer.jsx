import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer>
      <div className="container">
        <p>&copy; Sensorium 2018. All Rights Reserved.</p>
        <ul className="list-inline">
          <li className="list-inline-item">
          	{/*Gotta work on these Toooooooooo*/}
            <a href="#">Privacy</a>
          </li>
          <li className="list-inline-item">
            <a href="#">Terms</a>
          </li>
          <li className="list-inline-item">
            <a href="#">FAQ</a>
          </li>
        </ul>
      </div>
    </footer>
    );
  }
}

export default Footer;
