import firebase from 'firebase'
var config = {
    apiKey: "a",
    authDomain: "s.firebaseapp.com",
    databaseURL: "https://s.firebaseio.com",
    projectId: "s",
    storageBucket: "s.appspot.com",
    messagingSenderId: "1"
};
var fire = firebase.initializeApp(config);
export default fire;