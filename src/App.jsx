import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router,Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './components/Home';
import About from './components/About';
import News from './components/News';
import Navbar from './components/CustomNavbar';
import Footer from './components/Footer';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import Profile from './components/user/Profile';
import 'firebase/firestore';
import firebaseConf from './config/FirebaseConfig';

/*import ReactGA from 'react-ga';
ReactGA.initialize('UA-120543225-1');
ReactGA.pageview(window.location.pathname + window.location.search);*/

class App extends Component {
  constructor (props){
    super(props);
    this.db = firebaseConf.firestore();
    const settings = { timestampsInSnapshots: true};
    this.db.settings(settings);
  }
  
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" component={Home} />
          <ScrollToTop>
            <Route path="/about" component={About} />
            <Route path="/news" component={News} />
            <Route path="/terms" component={Terms} />
            <Route path="/privacy" component={Privacy} />
            <Route path="/profile" component={Profile} />
          </ScrollToTop>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
