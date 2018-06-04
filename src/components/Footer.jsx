import React, { Component } from 'react';

import {Row, Container, List} from 'reactstrap';
import './style/Footer.css';
import './style/responsive.css';

class Footer extends Component {
  render() {
    return (
      <section id="footer">
      <Container>
        <Row  text-center="true">
          <div className="col-xs-12 col-sm-4 col-md-4">
            
          </div>
          <div className="col-xs-12 col-sm-4 col-md-4">
            
          </div>

          <div className="col-xs-12 col-sm-4 col-md-4 footer-content">
            <h5>Quick links</h5>
            <ul className="list-unstyled quick-links">
              <li><a href="javascript:void();"><i className="fa fa-angle-double-right"></i>Home</a></li>
              <li><a href="javascript:void();"><i className="fa fa-angle-double-right"></i>About</a></li>
              <li><a href="javascript:void();"><i className="fa fa-angle-double-right"></i>FAQ</a></li>
              <li><a href="javascript:void();"><i className="fa fa-angle-double-right"></i>Get Started</a></li>
              <li><a href="" title="Design and developed by"><i className="fa fa-angle-double-right"></i>Imprint</a></li>
            </ul>
          </div>

        </Row>
        <Row>
          <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-5 footer-content">
            <ul className="list-unstyled list-inline social text-center">
              <li className="list-inline-item"><a href="javascript:void();"><i className="fa fa-facebook"></i></a></li>
              <li className="list-inline-item"><a href="javascript:void();"><i className="fa fa-twitter"></i></a></li>
              <li className="list-inline-item"><a href="javascript:void();"><i className="fa fa-instagram"></i></a></li>
              <li className="list-inline-item"><a href="javascript:void();"><i className="fa fa-google-plus"></i></a></li>
              <li className="list-inline-item"><a href="javascript:void();" target="_blank"><i className="fa fa-envelope"></i></a></li>
            </ul>
          </div>
          
        </Row>  
        <Row>
          <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white footer-content">
            <p className="white-text">Ten years ago a crack commando unit was sent to prison by a military court for a crime they didn't commit.</p>
            <p className="h6">&copy; All right Reversed.<a className="text-green ml-2" href="https://www.sensorium.online" target="_blank">Sensorium</a></p>
          </div>
          <hr />
        </Row>  
      </Container>
    </section>
    );
  }
}

export default Footer;
