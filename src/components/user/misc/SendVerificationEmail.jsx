import { firebase } from './../../../config/FirebaseConfig';

function SendVerificationEmail(user){
    var user = firebase.auth().currentUser;
    var host = 'http://localhost:3000';

    var actionCodeSettings = {
        url: host + '/profile',
        iOS: {
            bundleId: 'com.example.ios'
        },
        android: {
            packageName: 'com.example.android',
            installApp: true,
            minimumVersion: '12'
        },
        handleCodeInApp: false
    };

    user.sendEmailVerification(actionCodeSettings).then(()=> {
        alert('Email sent')
    }).catch((error)=> {
        console.log(error);
        alert('An error happened. Please contact us.');
    });
}

export default SendVerificationEmail;