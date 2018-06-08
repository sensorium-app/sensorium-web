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
                          <a className="btn btn-grad-peach" href="#" role="button" onClick={this.handleShow}>Pre-Register</a>
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
            <h2>WHAT</h2>
              <p className="text-justify">
                Children of the sun, see your time has just begun, searching for your ways, through adventures every day. 
                Every day and night, with the condor in flight, with all your friends in tow, you search for the Cities of Gold. 
                Ah-ah-ah-ah-ah... wishing for The Cities of Gold. Ah-ah-ah-ah-ah... 
                some day we will find The Cities of Gold.
              </p>
{/*              <a className="btn btn-grad-green">read more..</a>
*/}          </div>
      </Col>
      <Col xs="12" md="4" className="text-center">
          <div className="empty-box"></div>
          <div className=" s-cards bg-grad-pink">
          <h1>WHY</h1>
          <p className="text-justify">
          Ulysses, Ulysses - Soaring through all the galaxies. In search of Earth, flying in to the night. 
          Ulysses, Ulysses - Fighting evil and tyranny, with all his power, and with all of his might. 
          Ulysses - no-one else can do the things you do. Ulysses - like a bolt of thunder from the blue. 
          Ulysses - always fighting all the evil forces bringing peace and justice to all.


          </p>
{/*          <a className="btn btn-grad-pink">read more..</a>
*/}          </div>
      </Col>
      <Col xs="12" md="4" className="text-center">
           <div className="s-cards bg-grad-blue">
            <h1>WHEN</h1>
              <p className="text-justify">
                Children of the sun, see your time has just begun, searching for your ways, through adventures every day. 
                Every day and night, with the condor in flight, with all your friends in tow, you search for the Cities of Gold. 
                Ah-ah-ah-ah-ah... wishing for The Cities of Gold. Ah-ah-ah-ah-ah... 
                some day we will find The Cities of Gold.
              </p>
{/*              <a className="btn btn-grad-blue">read more..</a>
*/}          </div>
      </Col>
    </Container>
    <Container>
        <Jumbotron className="bg-grad-blue s-cards text-center mt-5">
        <h2>Impossibility is a registration away from reality.</h2>
          <p>Register for the first social media that was literally born in a fandom!</p>

        <Button className="btn btn-grad-blue" onClick={this.handleShow}>
        Pre-Register        </Button>
        </Jumbotron>
        
        <Row className="show-grid text-center">
          <Col xs={12} sm={4} className="person-wrapper">
            <Image src="assets/person-1.jpg" circle className="profile-pic"/>
            <h3>if we get mentioned by some reputable blogs or peoples we can add them here</h3>
            <p>That's a crooked tree. We'll send him to Washington. These little son of a guns hide in your brush and you just have to push them out.</p>
          </Col>
          <Col xs={12} sm={4} className="person-wrapper">
            <Image src="assets/person-2.jpg" circle className="profile-pic"/>
            <h3>if we get mentioned by some reputable blogs or peoples we can add them here</h3>
            <p>That's a crooked tree. We'll send him to Washington. These little son of a guns hide in your brush and you just have to push them out.</p>
          </Col>
          <Col xs={12} sm={4} className="person-wrapper">
            <Image src="assets/person-3.jpg" circle className="profile-pic"/>
            <h3>if we get mentioned by some reputable blogs or peoples we can add them here</h3>
            <p>That's a crooked tree. We'll send him to Washington. These little son of a guns hide in your brush and you just have to push them out.</p>
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
