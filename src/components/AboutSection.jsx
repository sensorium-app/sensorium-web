import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './AboutSection.css';

class AboutSection extends Component {
  render() {
    return (
      <section class="download bg-primary text-center" id="download">
      <div class="container">
        <div class="row">
          <div class="col-md-8 mx-auto">
            <h2 class="section-heading">Discover what all the buzz is about!</h2>
            <p>Our app is available on any mobile device! Download now to get started!</p>
            <div class="badges">
              <a class="badge-link btn btn-grad" href="#">Learn More</a>
              <a class="badge-link" href="#"></a>
            </div>
          </div>
        </div>
      </div>
    </section>
    );
  }
}

export default AboutSection;
