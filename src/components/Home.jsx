import React, { Component } from 'react'
import {Container, Row, Col, Jumbotron, Button } from 'reactstrap';
import {Image, Modal} from 'react-bootstrap';
import RegistrationForm from './form.jsx'; 
import Slide from 'react-reveal/Slide';
import Rotate from 'react-reveal/Rotate';
import Fade from 'react-reveal/Fade';

import './style/Home.css';
import './style/style.css';
import './style/responsive.css';

export default class Home extends Component {
  
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  render() {

    return (
      <Row>
      <header className="masthead row">
      <Col md={12}>
      <section className="hero-area">
          <Container>
              <Row>
                  <Col md={12}>
                      <Fade left>
                      <div className="block">
                          <a className="btn btn-grad-peach wow bounceIn" href="#form" role="button" >Pre-Register</a>
                      </div>
                      </Fade>
                  </Col>
              </Row>
          </Container>
      </section>
      </Col>
    </header>

    <section className="about  row">
       
          <Container>
            <Row text-center="true">
              <Col md={12}>
              <section className="rw-wrapper">
                <h3 className="rw-sentence">
                  <span>Division remains a force within the world.</span>
                  <span> We each exist within our own confines,</span>

                  <br />

                  <span>divided from the experiences of those who do not share our</span>
                  <div className="rw-words rw-words-1 grad-text">
                      <span>race</span>
                      <span>ethnicity</span>
                      <span>faith</span>
                      <span>ideology</span>
                      <span>gender</span>
                      <span>sexuality</span>
                      <span>profession</span>
                      <span>body</span>
                      <span>mind</span>
                  </div>

                </h3>
                <Fade>
                <a className=" btn btn-grad-peach learn-more" href="/about">Learn More</a>
                </Fade>
              </section>
                <div >
                </div>
              </Col>
            </Row>
          </Container>
       
    </section>
    {/*i know that we can use this componenets and shoudn't be written like this
     but i will change this later or
    if you want youcan make this a component*/}
    <Container >
      <Col xs="12" md="4" className="text-center">
      <Fade top>

          <div className="s-cards bg-grad-green">
            
            <h2>WHAT?</h2>
              <p className="text-justify">
              A virtual archipelago for Sensate  to connect and thrive in a home tailor made for Homo Sensoriums. Share, visit and be reborn as a Sensate and experience the wonder and beauty of our common humanity and shared values with a truly global community.</p>
              <p className="text-justify">
              This project is aimed to create connections between people that share core human values.
              We want to create a network that embraces empathy, love, collaboration and compassion throughout the world.
              
              </p>
            
{/*              <a className="btn btn-grad-green">read more..</a>
*/}       </div>
      </Fade>
      </Col>
      <Col xs="12" md="4" className="text-center">
      <Fade top>

          <div className="empty-box"></div>
          <div className=" s-cards bg-grad-pink">
          
          <h2>WHY?</h2>
          <p className="text-justify">
            Because this world desperately needs more peace and unity that can only be achieved through the connections of deep human souls.
            </p>
            <p className="text-justify">
            Because Sense8 is not just a work of art of piece of entertainment, it's a movement, it's a revolution, its the future we want to create. Sensates need a safe haven where like-minded and compassionate individuals like themselves are connected to one another, enriching each other's lives and changing the world, simultaneously.
          </p>

{/*          <a className="btn btn-grad-pink">read more..</a>
*/}          </div>
</Fade>
      </Col>
      <Col xs="12" md="4" className="text-center">
           <Fade top>
           <div className="s-cards bg-grad-blue">
           
            <h2>WHEN?</h2>
            <p className="text-justify">
                Right here, right now. We hope to expand this global community space to not only encompass means of connecting and sharing media but also interactive features, video games and other new tools to make like within this clustered hub a truly inspirational experience.
              </p>
              <p className="text-justify">
                We're on a pre-registration phase, which means you can register with some basic data.
                Our technology will create clusters automatically, but you will be able to participate
                actively once we launch an official release very soon.
              </p>
                
              
{/*              <a className="btn btn-grad-blue">read more..</a>
*/}          </div>
            </Fade>
      </Col>
    </Container>
    <Container id="form">
        
            
            <Jumbotron className="bg-grad-blue s-cards text-center mt-5">
            <Row >
          <Col md={4} className="mt-5">
          <Rotate top left cascade>
            <h2>Impossibility is a registration away from reality.</h2>
              <p>Register for the first social network that was literally born in a fandom!</p>
          </Rotate>
          </Col>
            
          <Col md={8}>
          <RegistrationForm classname="s-head"/>

          </Col>
          </Row>
            </Jumbotron>
          
        
        
        <Row className="show-grid text-center">
          <Col xs={12} sm={4} className="person-wrapper">
          </Col>
          <Col xs={12} sm={4} className="person-wrapper">
            <Fade bottom><Image src="assets/person-1.jpg" circle className="profile-pic"/></Fade>
            <Rotate to left cascade>
            <h4>"...it should come as no surprise that the Sense8 fandom will also be among the first in television history to create an online universe based on the Wachowski Sisters’ creation, connecting sensates around the world, much like the heroes of their beloved series."</h4>
            <p>Siddy Nickhead<br /> <a href="https://medearants.wordpress.com" target="_blank" rel="noopener noreferrer">https://medearants.wordpress.com</a></p></Rotate>
          </Col>
          <Col xs={12} sm={4} className="person-wrapper">
          </Col>
        </Row>
      </Container>

       <Modal show={this.state.show} onHide={this.handleClose} >
          <Modal.Header closeButton className="s-modal-head bg-grad-green">
            <Modal.Title >
            <div text-center="" className="grad-text">
              <h3> "Who's standing here?"</h3>
            </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body >

                    <RegistrationForm classname="s-head"/>
                       
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose} className="btn btn-grad-blue">Close</Button>
          </Modal.Footer>
        </Modal>
        <Fade >
        <Container>
          <Row>
            <Col md={6}>
               <h4>This project is open sourced</h4>
                <code>$ git clone https://github.com/sensorium-app/sensorium-web.git sensorium</code>
            </Col>
            <Col md={6}>
                <h4>Help this project grow!</h4>
                <p>We strongly believe in united people reaching common goals. 
                  This project was conceived as open source and we value each and everyone's opinion and contributions.
                </p>
            </Col>
          </Row>
        </Container>
        </Fade>
      </Row>
    )
  }
}
