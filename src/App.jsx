import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import News from './components/News';
import Navbar from './components/CustomNavbar';
import Footer from './components/Footer';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import 'firebase/firestore';
import firebaseConf from './config/FirebaseConfig';

class App extends Component {
  constructor (props){
    super(props);
    this.db = firebaseConf.firestore();
    const settings = { timestampsInSnapshots: true};
    this.db.settings(settings);
    //this.db.collection('sensates').add({id:1, name:'leo', email:'@'});
    
    /*let messagesRef = this.db.collection("sensates").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        //this.state.messages.push({uid: doc.id, email: doc.data().email})
      });
    });*/
  }
  
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/news" component={News} />
          <Route path="/terms" component={Terms} />
          <Route path="/privacy" component={Privacy} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
