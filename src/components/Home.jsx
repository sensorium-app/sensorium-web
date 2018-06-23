import React, { Component } from 'react'
import {Container, Row, Col, Jumbotron} from 'reactstrap';
import {Image} from 'react-bootstrap';
import RegistrationForm from './form.jsx';
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
      show: false,
      authUser: props.authUser
    };

    console.log(this.props.authUser)
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
      <header className="masthead row bgimg">
      <Col md={12}>
      <section className="hero-area">
          <Container className="text-center">
              <Row>
                <h1 className="white-text visible-xs">Isolated above,</h1>
                <h1 className="white-text visible-xs">connected below</h1>
                {this.state.authUser ? null :
                  <Col md={6}>
                      <Fade left>
                        <div className="block">
                            <a className="btn btn-grad-peach wow bounceIn" href="/login" role="button" >Login</a>
                        </div>
                      </Fade>
                  </Col>
                }
                {this.state.authUser ? null :
                  <Col md={6}>
                    <Fade left>
                      <div className="block">
                          <a className="btn btn-grad-peach wow bounceIn" href="#form" role="button" >Pre-Register</a>
                      </div>
                     </Fade>
                  </Col>
                }
              </Row>
          </Container>
      </section>
      </Col>
    </header>

    <section className="about row">
       
          <Container>
            <Row text-center="true">
              <Col md={12}>
              <section className="rw-wrapper">
                <h3 className="rw-sentence h3-responsive">
                <span>Division remains a force within the world. We each exist within our own confines, 
                divided from the experiences of those who do not share our:</span>
                  

                </h3>
                <div className="text-center">
                  <div className="h1-responsive text-center rw-words rw-words-1 grad-text">
                      <span className="grad-text-span">ethnicity</span>
                      <span className="grad-text-span">faith</span>
                      <span className="grad-text-span">ideology</span>
                      <span className="grad-text-span">gender</span>
                      <span className="grad-text-span">sexuality</span>
                      <span className="grad-text-span">profession</span>
                      <span className="grad-text-span">body</span>
                      <span className="grad-text-span">mind</span>
                  </div>
                </div>
                <br />
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

          <div className="s-cards bg-grad-pink">
          
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
                Right here, right now. We hope to expand this global community space to not only encompass means of connecting and sharing media but also interactive features, video games and other new tools to make life within this clustered hub a truly inspirational experience.
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
        
            
            {this.state.authUser ? null :
              <Jumbotron className="bg-grad-blue s-cards text-center mt-5">
                <Row >
                  <Col md={4} className="">
                  <Rotate top left cascade>
                    <div>
                      <h2>Impossibility is a registration away from reality.</h2>
                      <p>Register for the first social network that was literally born in a fandom!</p>
                    </div>
                  </Rotate>
                  </Col>
                    
                  <Col md={8}>
                  <RegistrationForm classname="s-head"/>

                  </Col>
                </Row>
              </Jumbotron>
            }
          
        
        
        <Row className="show-grid text-center">
          <Col xs={12} sm={4} className="person-wrapper">
          </Col>
          <Col xs={12} sm={4} className="person-wrapper">
            <Fade bottom><Image src="assets/person-1.jpg" circle className="profile-pic"/></Fade>
            <Rotate top left cascade>
              <div>
                <h4>"...it should come as no surprise that the Sense8 fandom will also be among the first in television history to create an online universe based on the Wachowski Sisters’ creation, connecting sensates around the world, much like the heroes of their beloved series."</h4>
                <p>Siddy Nickhead<br /> <a href="https://medearants.wordpress.com" target="_blank" rel="noopener noreferrer">https://medearants.wordpress.com</a></p>
              </div>
            </Rotate>
          </Col>
          <Col xs={12} sm={4} className="person-wrapper">
          </Col>
        </Row>
      </Container>
        <Container>
          <Fade bottom>
            <Row className="text-center">
              <Col md={6}>
                <h2>This project is open sourced</h2>
                <i className="fa fa-github git-logo"></i><code>$ git clone https://github.com/sensorium-app/sensorium-web.git</code>
              </Col>
              <Col md={6}>
                  <h4>Help this project grow!</h4>
                  <p>We strongly believe in united people reaching common goals. 
                    This project was conceived as open source and we value each and everyone's opinion and contributions.<br />
                    <a href="https://join.slack.com/t/sense8app/shared_invite/enQtMzA3MzIwMDU0NjQ3LWIzMDA1ZTY4OTczMzJiOTU3ZjkwZGFmNTAzODc1ZjBjOWZjNjc4YmVlMjhjNWI3Zjc4OGIwMmEyZWQwY2ZlYjE" target="_blank">Join us on Slack!</a>
                    
                  </p>
              </Col>
            </Row>
            </Fade>
        </Container>
      </Row>
    )
  }
}
