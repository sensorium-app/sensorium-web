import React, { Component } from 'react';
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';
import Jumbotron from '../components/Jumbotron.jsx';
import AboutSection from '../components/AboutSection.jsx';
import Timeline from '../components/Timeline.jsx';
import img from '../images/lol.png';
class Home extends Component {
  render() {
    return (
      <div>
        <Navbar title="Sensorium" link1="Home" link2="About" link3="Contact"/>
        <Jumbotron title="Welcome" subtitle="Put something witty here!" />
        
        <AboutSection />
        
        <div className="container">
          <div className="row mt-5">
            <div className="col-md-8">
              <Timeline />
            </div>
            <div className="col-md-4">
              <img src={img} className="img-fluid" />
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }
}

export default Home
