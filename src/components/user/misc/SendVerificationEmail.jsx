import { firebase } from './../../../config/FirebaseConfig';

function SendVerificationEmail(){
    var user = firebase.auth().currentUser;
    var host = 'https://sensorium-76912.firebaseapp.com';

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

    return new Promise((resolve, reject)=>{
        user.sendEmailVerification(actionCodeSettings).then(()=> {
            resolve('Email sent');
        }).catch((error)=> {
            console.log(error);
            reject(error);
        });
    });
}

export default SendVerificationEmail;