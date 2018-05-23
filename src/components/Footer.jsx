import React, { Component } from 'react';
import {Container, List} from 'react-bootstrap';
import './style/Footer.css';
import './style/responsive.css';

class Footer extends Component {
  render() {
    return (
      <section id="footer">
      <div className="container">
        <div className="row text-center text-xs-center text-sm-left text-md-left">
          <div className="col-xs-12 col-sm-4 col-md-4">
            
          </div>
          <div class="col-xs-12 col-sm-4 col-md-4">
            
          </div>
          <div class="col-xs-12 col-sm-4 col-md-4">
            <h5>Quick links</h5>
            <ul class="list-unstyled quick-links">
              <li><a href="javascript:void();"><i className="fa fa-angle-double-right"></i>Home</a></li>
              <li><a href="javascript:void();"><i className="fa fa-angle-double-right"></i>About</a></li>
              <li><a href="javascript:void();"><i className="fa fa-angle-double-right"></i>FAQ</a></li>
              <li><a href="javascript:void();"><i className="fa fa-angle-double-right"></i>Get Started</a></li>
              <li><a href="https://wwwe.sunlimetech.com" title="Design and developed by"><i class="fa fa-angle-double-right"></i>Imprint</a></li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div class="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-5">
            <ul class="list-unstyled list-inline social text-center">
              <li class="list-inline-item"><a href="javascript:void();"><i className="fa fa-facebook"></i></a></li>
              <li class="list-inline-item"><a href="javascript:void();"><i className="fa fa-twitter"></i></a></li>
              <li class="list-inline-item"><a href="javascript:void();"><i className="fa fa-instagram"></i></a></li>
              <li class="list-inline-item"><a href="javascript:void();"><i className="fa fa-google-plus"></i></a></li>
              <li class="list-inline-item"><a href="javascript:void();" target="_blank"><i class="fa fa-envelope"></i></a></li>
            </ul>
          </div>
          
        </div>  
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
            <p class="white-text">Ten years ago a crack commando unit was sent to prison by a military court for a crime they didn't commit.</p>
            <p class="h6">&copy; All right Reversed.<a class="text-green ml-2" href="https://www.sensorium.online" target="_blank">Sensorium</a></p>
          </div>
          <hr />
        </div>  
      </div>
    </section>
    );
  }
}

export default Footer;
