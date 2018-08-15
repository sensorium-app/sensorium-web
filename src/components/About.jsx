import React, { Component } from 'react'
import { Grid, Col, Image } from 'react-bootstrap';
import './style/About.css';

export default class About extends Component {
  render() {
    return (
      <div>
        <br/><br/><br/>
        <div className="container">
          <Image src="assets/infinty.png" className=" img-fluid about-profile-pic" rounded />
        </div>
        <h1 className="text-center">Isolated Above, Connected Below</h1>
        <Grid>
          <Col sm={6}>
              <div className="">
                <div className="s-cards">
                  
                    <h4 className="card-title">Division?</h4>
                    <p>Divisions do little more than isolate us from one another and from the wisdom and beauty that each one of us can share.  This isolation leads to pain, fear, ignorance, and hatred because division does not seek to understand.</p>
                  
                </div>
              </div>
          </Col>
          <Col sm={6}>
            <div className="">
              <div className="s-cards">
                <h4 className="card-title">Technology?</h4>
                <p>Technology has been both a blessing and a curse – it has both exacerbated and alleviated these divisions.
                What if we could come closer to understanding someone that is unlike us? The walls of division would fall and isolation would relent to connection.</p>
              </div>

            </div>
          </Col>

          <Col xs={12} sm={8} smOffset={2}>

            <div className="">
              <div className="s-cards">
                <h4 className="card-title">Introducing Sensorium!</h4>
                <p>Imagine a world where we could connect to the wisdom of those who live around the globe, share intimate moments with a core group of people, or visit a unique individual from the tip of your fingers. </p>
                <p>Be matched with a core group of people throughout the world based on a variety of different factors. Discover a network of your own sensates and contribute to the collective wisdom that we are all one and the same.</p>
                <a href="https://join.slack.com/t/sense8app/shared_invite/enQtMzA3MzIwMDU0NjQ3LWIzMDA1ZTY4OTczMzJiOTU3ZjkwZGFmNTAzODc1ZjBjOWZjNjc4YmVlMjhjNWI3Zjc4OGIwMmEyZWQwY2ZlYjE" target="_blank" rel="noopener noreferrer">Join us on Slack!</a>
              </div>

            </div>

          </Col>
        </Grid>
      </div>
    )
  }
}
