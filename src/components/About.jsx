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
              <div className="card">
                <div className="card-body">
                  
                    <h4 className="card-title">Divison?</h4>
                    <p>Divisions do little more than isolate us from one another and from the wisdom and beauty that each one of us can share.  This isolation leads to pain, fear, ignorance, and hatred because division does not seek to understand.</p>
                  
                </div>
              </div>
          </Col>
          <Col sm={6}>
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Technology?</h4>
                <p>Technology has been both a blessing and a curse – it has both entrenched this division and alleviated it.
                But what if we could come closer to understanding someone that is unlike us? The walls of division would fall, and the isolation would relent to connection.</p>
              </div>

            </div>
          </Col>

          <Col xs={12} sm={8} smOffset={2}>

            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Sensorium!</h4>
                <p>Imagine a world where we could connect to the wisdom of those who live around the world, share intimate moments with a core group of people, or visit with an individual who sounds different than ourselves. That is Sensorium.</p>
                <p>You will be matched with a core group of people throughout the world. What factors brought you together? Your birthdays and other factors comming up. Matched to individuals who share you birthday and other factors, you can begin to connect to that wisdom that this world so desperately needs.</p>
              </div>

            </div>

          </Col>
        </Grid>
      </div>
    )
  }
}
