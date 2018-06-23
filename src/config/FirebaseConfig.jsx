import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var config = {
    apiKey: "A",
    authDomain: "s.firebaseapp.com",
    databaseURL: "https://s.firebaseio.com",
    projectId: "s",
    storageBucket: "s.appspot.com",
    messagingSenderId: "1"
};
var fire = firebase.initializeApp(config);
export default fire;