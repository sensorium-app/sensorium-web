import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {Container, Row, Col, Jumbotron, Button , Input } from 'reactstrap';
import {Image, Modal} from 'react-bootstrap';
import RegistrationForm from './form.jsx'; 
import './style/Home.css';
import './style/style.css';
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
      <div className="row">
      <Row className="masthead">
      <Col md={12} xs={12}>
      
      <section className="hero-area">
          <Container>
              <Row>
                  <Col md={4} xs={6}>
                      <div class="block">
                          <a className="btn btn-grad-peach" href="#about" role="button">Register</a>

                      </div>
                  </Col>
                  <Col md={8} xs={6} className="">
                   <div className="block grad-text">
                     <h1 className="hero-title d-flex align-content-center">
                      Isolated Above 
                      Connected Below
                    </h1>
                   </div>
                  </Col>
              </Row>
          </Container>
      </section>
        
      </Col>
    </Row>

    <section className="about">
          <Container>
            <Row className="text-center">
              <div class="container">
              <section class="rw-wrapper">
                <h3 class="rw-sentence">
                  <span>Division remains a force within the world.</span>
                  <span> We each exist within our own confines,</span>
                  

                  <br />

                  <span>divided from the experiences of those who do not share our</span>
                  <div class="rw-words rw-words-1 grad-text">
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
                <a class=" btn btn-grad-peach learn-more" href="#">Learn More</a>

              </section>
                <div >
                </div>
              </div>
            </Row>
          </Container>
       
    </section>
    {/*i knwo that we can use this componenets and shoudn't be written like this
     but i will change this later or
    if you want youcan make this a component*/}
    <Container >
      <Col xs="12" md="4" className="text-center">
          <div className="s-cards bg-grad-green">
            <h1>WHAT</h1>
              <p className="text-justify">
                Children of the sun, see your time has just begun, searching for your ways, through adventures every day. 
                Every day and night, with the condor in flight, with all your friends in tow, you search for the Cities of Gold. 
                Ah-ah-ah-ah-ah... wishing for The Cities of Gold. Ah-ah-ah-ah-ah... 
                some day we will find The Cities of Gold.
              </p>
              <a className="btn btn-grad-green">read more..</a>
          </div>
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
          <a className="btn btn-grad-pink">read more..</a>
          </div>
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
              <a className="btn btn-grad-blue">read more..</a>
          </div>
      </Col>
    </Container>
    <Container>
        <Jumbotron className="bg-grad-blue jumbotron-bg s-cards text-center mt-5">
        <h2>Impossibility is a Registration away from reality.</h2>
          <p>Register for the first social media website that literally born in  a fandom !!</p>

        <Button className="btn btn-grad-blue" onClick={this.handleShow}>
RrrrRRegister        </Button>
        </Jumbotron>
        
        <Row className="show-grid text-center">
          <Col xs={12} sm={4} className="person-wrapper">
            <Image src="assets/person-1.jpg" circle className="profile-pic"/>
            <h3>if we get mentioned by some prestigious blogs or peoples we can add them here</h3>
            <p>That's a crooked tree. We'll send him to Washington. These little son of a guns hide in your brush and you just have to push them out.</p>
          </Col>
          <Col xs={12} sm={4} className="person-wrapper">
            <Image src="assets/person-2.jpg" circle className="profile-pic"/>
            <h3>if we get mentioned by some prestigious blogs or peoples we can add them here</h3>
            <p>That's a crooked tree. We'll send him to Washington. These little son of a guns hide in your brush and you just have to push them out.</p>
          </Col>
          <Col xs={12} sm={4} className="person-wrapper">
            <Image src="assets/person-3.jpg" circle className="profile-pic"/>
            <h3>if we get mentioned by some prestigious blogs or peoples we can add them here</h3>
            <p>That's a crooked tree. We'll send him to Washington. These little son of a guns hide in your brush and you just have to push them out.</p>
          </Col>
        </Row>
      </Container>

       <Modal show={this.state.show} onHide={this.handleClose} className="s-modal">
          <Modal.Header closeButton  className="bg-grad-green s-modal-head">
            <Modal.Title>
            <div text-center className="grad-text">
              <h3> "In the end, we will all be judged by the usernames of our profile."</h3>
            </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
                    <RegistrationForm/>

            <h4>Text in a modal</h4>
            <p>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </p>

            <h4>Popover in a modal</h4>
            
>

            <hr />

            <h4>Overflowing text to show scroll behavior</h4>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </p>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur
              et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
              auctor.
            </p>
            
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose} className="btn btn-grad-blue"  >Close</Button>
          </Modal.Footer>
        </Modal>
      
      </div>
    )
  }
}
