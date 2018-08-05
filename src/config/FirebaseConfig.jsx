import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var config = {
    apiKey: "AIzaSyBtEaff-AyfVvF2dirOsrJg0ts_5FFQ5UQ",
    authDomain: "sensorium-76912.firebaseapp.com",
    databaseURL: "https://sensorium-76912.firebaseio.com",
    projectId: "sensorium-76912",
    storageBucket: "sensorium-76912.appspot.com",
    messagingSenderId: "759821982978"
 };
var fire = firebase.initializeApp(config);
export default fire;

export {firebase};