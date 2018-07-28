import React, { Component } from 'react';
import {Row, Container} from 'reactstrap';
import './style/Footer.css';
import './style/responsive.css';

class Footer extends Component {
  constructor(props) {
    super(props);

    console.log(props);

    this.state = {
      authUser: props.authUser
    };
  }
  render() {
    return (
     <div> {! this.state.authUser?null: <section id="footer">
      <Container>
        <Row  text-center="true">
          <div className="col-xs-4 col-sm-4 col-md-4">
          </div>
          
          <div className="col-xs-4 col-sm-4 col-md-4">            
          </div>

          <div className="col-xs-4 col-sm-4 col-md-4 footer-content">
            <h5>Quick links</h5>
            <ul className="list-unstyled quick-links">
              <li><a href="/"><i className="fa fa-angle-double-right"></i>Home</a></li>
              <li><a href="/about"><i className="fa fa-angle-double-right"></i>About</a></li>
              <li><a href="/terms"><i className="fa fa-angle-double-right"></i>Terms and Conditions </a></li>
              <li><a href="/privacy"><i className="fa fa-angle-double-right"></i>Privacy Policy </a></li>
            </ul>
          </div>

        </Row>
        <Row>
          <div className="col-xs-12 col-sm-12 col-md-12 mt-2 footer-content">
            <ul className="list-unstyled list-inline social text-center">
            <li className="list-inline-item"><a href="https://twitter.com/sensoriumapp" target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter"></i></a></li>
            <li className="list-inline-item"><a href="https://fb.me/SensoriumApp" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook"></i></a></li> 
            <li className="list-inline-item"><a href="https://instagram.com/sensoriumapp/" target="_blank" rel="noopener noreferrer"><i className="fa fa-instagram"></i></a></li> 
            <li className="list-inline-item"><a href="https://join.slack.com/t/sense8app/shared_invite/enQtMzA3MzIwMDU0NjQ3LWIzMDA1ZTY4OTczMzJiOTU3ZjkwZGFmNTAzODc1ZjBjOWZjNjc4YmVlMjhjNWI3Zjc4OGIwMmEyZWQwY2ZlYjE" target="_blank" rel="noopener noreferrer"><i className="fa fa-slack"></i></a></li>             
              <li className="list-inline-item"><a href="mailto:info@sensorium.online" target="_blank" rel="noopener noreferrer"><i className="fa fa-envelope"></i></a></li>
            </ul>
          </div>
          
        </Row>  
        <Row>
          <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white footer-content">
            <p className="h6">&copy; All rights reserved.<span className="text-green ml-2">Sensorium</span></p>
          </div>
          <hr />
        </Row>  
      </Container>
    </section>}</div>
    );
  }
}

export default Footer;
