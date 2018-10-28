import React, { Component } from 'react';
import { Grid, Row, Col, Image } from 'react-bootstrap';
import './style/News.css';

export default class News extends Component {
  render() {
    return (
      <div className="news-page-outline">

        <br/><br/>
        <Grid>
          <h2 className="news-page">News</h2>
          <Row>
            <Col xs={12} sm={8} className="main-section">
              <h3>October 27th, 2018</h3>
              <p>Pre-registration phase is almost over! We are excited to release a plethora of new features soon coming to Sensorium Online. Interact with your cluster and join our public archipelago. Create your own network of sensates and live the Sensorium experience!</p>
              <br></br>
              <p>If you have any questions about the coming features, feel free to email us at <a href = "mailto:info@sensorium.online" data-rel="external">info@sensorium.online</a>.</p>
              <h3>June 9th, 2018</h3>
              <p>These days have been tough for us.</p> 
              <p>But we're finally here with no regrets because we know it will be worth it. 
                Something by the fans, for the fans. The Sensorium Social Network is now in its pre-registration phase! Add your name, email, and birthday and you will have the opportunity to share a new experience based on Netflix's original series Sense8.</p>
            </Col>
            <Col xs={12} sm={4} className="sidebar-section">
              <Image src="assets/team.jpg" />
              <p className="hidden-xs">Meet the team!</p>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
