import React, { Component } from 'react';
import { Grid, Row, Col, Image } from 'react-bootstrap';
import './style/News.css';

export default class News extends Component {
  render() {
    return (
      <div>

        <br/><br/>
        <Grid>
          <h2>News</h2>
          <Row>
            <Col xs={12} sm={8} className="main-section">
              <h3>June 9th, 2018</h3>
              <p>These days have been tough for us.</p>
              <p>But we're finally here with no regrets because we know it will be worth it. 
                Something by the fans, for the fans. The Sensorium Social Network is now in its pre-registration phase! Add your name, email, and birthday and you will have the opportunity to share a new experience based on Netflix's original series Sense8.</p>
            </Col>
            <Col xs={12} sm={4} className="sidebar-section">
              <Image src="assets/team.jpg" />
              <p className="hidden-xs">Meet our team.</p>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
