import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {Container, Row, Col, Jumbotron, Button , Input } from 'reactstrap';
import {Image, Modal} from 'react-bootstrap';
import RegistrationForm from './form.jsx'; 
import './style/Home.css';
import './style/style.css';
import './style/responsive.css';

export default class Home extends React.Component {
  
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
                      <div className="block">
                          <a className="btn btn-grad-peach" href="#form" role="button" >Pre-Register</a>
                      </div>
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
                <a className=" btn btn-grad-peach learn-more" href="#">Learn More</a>

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
          <div className="s-cards bg-grad-green">
            <h2>WHAT?</h2>
              <p className="text-justify">
                A specialized social network of like-minded people that will be able to connect and share experiences based on empathy and comprehension.
              </p>
{/*              <a className="btn btn-grad-green">read more..</a>
*/}          </div>
      </Col>
      <Col xs="12" md="4" className="text-center">
          <div className="empty-box"></div>
          <div className=" s-cards bg-grad-pink">
          <h1>WHY</h1>
          <p className="text-justify">
            Because this world desperately needs more peace and unity that can only be achieved through the connections of deep human souls.
          </p>
{/*          <a className="btn btn-grad-pink">read more..</a>
*/}          </div>
      </Col>
      <Col xs="12" md="4" className="text-center">
           <div className="s-cards bg-grad-blue">
            <h1>WHEN</h1>
              <p className="text-justify">
                We're on a pre-registration phase, which means you are very welcome to register with some basic data.
                Under the hood, our technology will start generating clusters automatically, but you'll be able to participate
                actively once we launch an official release. We'll have sharing between cluster members and with all the archipelago and more features.
                We are on a constant development and improvement, so come back frequently to stay updated.
              </p>
{/*              <a className="btn btn-grad-blue">read more..</a>
*/}          </div>
      </Col>
    </Container>
    <Container id="form">
        
            
            <Jumbotron className="bg-grad-blue s-cards text-center mt-5">
            <Row >
          <Col md={4} className="mt-5">
            <h2>Impossibility is a registration away from reality.</h2>
              <p>Register for the first social media that was literally born in a fandom!</p>

            
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
            <Image src="assets/person-1.jpg" circle className="profile-pic"/>
            <h4>"...it should come as no surprise that the Sense8 fandom will also be among the first in television history to create an online universe based on the Wachowski Sisters’ creation, connecting sensates around the world, much like the heroes of their beloved series."</h4>
            <p>Siddy Nickhead<br /> <a href="https://medearants.wordpress.com">https://medearants.wordpress.com</a></p>
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
      </Row>
    )
  }
}
