import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import firebaseConf from './../../config/FirebaseConfig';

const userIsLoggedIn = new Promise((resolve)=>{
    firebaseConf.auth().onAuthStateChanged((user) =>{
        if (user) {
            resolve(true);
        }else{
            resolve(false);
        }
    });
});

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default PrivateRoute;