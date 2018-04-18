import React, { Component } from 'react';
import './Jumbotron.css';
import bg from '../images/s8.jpg'
class Jumbotron extends Component {
  render() {

    return (

      <header className="masthead row">
      <div className="col-md-12">
        <img src={bg} className="img-fluid bg-masthead" />
      </div>
      <div className="container h-100">
        <div className="row h-100">
          <div className="col-lg-7 my-auto">
            <div className="header-content mx-auto">
              <a href="#download" class="btn btn-outline btn-xl btn-grad js-scroll-trigger">Register</a>
            </div>
          </div>
          <div className="col-lg-5 my-auto">
            <div className="device-container">
              <div className="device-mockup iphone6_plus portrait white">
                <div className="device">
                  <div className="screen">
                  </div>
                  <div class="button">
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    );

  }

}

export default Jumbotron;
