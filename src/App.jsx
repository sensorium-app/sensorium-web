import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router,Route,Redirect } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/CustomNavbar';

import { Home, Login, Profile, About, Footer, News, Privacy, Terms } from './Routing';

import firebaseConf from './config/FirebaseConfig';
import { ThemeProvider, defaultTheme } from '@livechat/ui-kit'

/*import ReactGA from 'react-ga';
ReactGA.initialize('UA-120543225-1');
ReactGA.pageview(window.location.pathname + window.location.search);*/

const mql = window.matchMedia(`(min-width: 768px)`);
const chatTheme = {
  TitleBar: {
    css: {
      ...defaultTheme.TitleBar.css,
      backgroundColor: '#64b5f6',
    },
  },
}

class App extends Component {
  constructor (props){
    super(props);
    
    this.state = {
      authUser: null,
      menuOpen: mql.matches
    };

    this.db = firebaseConf.firestore();
    const settings = { timestampsInSnapshots: true};
    this.db.settings(settings);
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
  }

  componentDidMount() {
    firebaseConf.auth().onAuthStateChanged(authUser => {
      console.log(authUser)
      if(authUser){
        authUser.getIdToken(true).then((token)=>{
          console.log(token);
          this.setState(() => ({ authUser }))
        }).catch((err)=>{
          console.log(err);
        });
      }else{
        this.setState(() => ({ authUser: null }));
      }
    });
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  componentWillUnmount() {
    if(this.state.mql){
      this.state.mql.removeListener(this.mediaQueryChanged);
    }
  }

  mediaQueryChanged() {
    this.setState({ menuOpen: mql.matches });
  }

  // This keeps your state in sync with the opening/closing of the menu
    // via the default means, e.g. clicking the X, pressing the ESC key etc.
    handleStateChange (state) {
      this.setState({menuOpen: state.isOpen})  
    }
    
    // This can be used to close the menu, e.g. when a user clicks a menu item
    closeMenu () {
        this.setState({menuOpen: false})
    }

    // This can be used to toggle the menu, e.g. when using a custom icon
    // Tip: You probably want to hide either/both default icons if using a custom icon
    // See https://github.com/negomi/react-burger-menu#custom-icons
    toggleMenu () {
        this.setState({menuOpen: !this.state.menuOpen})
    }
  
  render() {
    return (
      <ThemeProvider theme={chatTheme}>
        <Router>
          <div>
            {this.state.authUser && <Navbar authUser={this.state.authUser} menuControl={this.toggleMenu.bind(this)} /> }
            {!this.state.authUser && <Navbar authUser={null} menuControl={this.toggleMenu.bind(this)} /> }
            <Route exact path="/" render={()=> this.state.authUser && <Redirect to="/profile"/> } />
            <Route exact path="/" render={()=> !this.state.authUser && <Home authUser={null}/> } />
            <ScrollToTop>
              <Route path="/about" component={About} />
              <Route path="/news" component={News} />
              <Route path="/terms" component={Terms} />
              <Route path="/privacy" component={Privacy} />
              <Route path="/profile" render={()=> this.state.authUser ? 
                <Profile authUser={this.state.authUser} 
                  menuOpen={this.state.menuOpen} handleStateChange={this.handleStateChange.bind(this)} 
                  bigScreen={mql.matches}/> : 
                <Redirect to="/"/> } />
              <Route path="/login" render={()=> !this.state.authUser && <Login/> }/>
              <Route path="/login" render={()=> this.state.authUser && <Redirect to="/profile" /> }/>
            </ScrollToTop>
            {!this.state.authUser && <Footer /> }
          </div>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
