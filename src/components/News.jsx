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
              <h3>June 9th 2018</h3>
              <p>These days have been tough for us. The await for the Sense8 special episode 'Amor Vincit Omnia' and preparing to launch this site with few sleep.</p>
              <p>But we're finally here with no regrets because it has been and we know it will be worth it. 
                Something by fans, for the fans. The Sensorium Social Network is now on its pre-registration phase! Add you name, email, birthdate and very soon you will have the opportunity to share a new experience on the web based on Netflix's Original Series Sense8.</p>
              <small>Disclaimer: This is a fan generated project and is not officialy affiliated to Netflix, nor we pretend to infringe any copyright material.</small>
            </Col>
            <Col xs={12} sm={4} className="sidebar-section">
              <Image src="assets/team.jpg" />
              <p>Meet our team.</p>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
