import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import {firebase} from './../../../../config/FirebaseConfig';

class EmailVerification extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            newEmail: '',
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.reSendVerificationEmail = this.reSendVerificationEmail.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
    }
    

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    reSendVerificationEmail(){
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
            // An error happened.
            console.log(error);
            alert('An error happened. Please contact us.');
        });
    }
    
    changeEmail(){
        var user = firebase.auth().currentUser;

        user.updateEmail(this.state.newEmail).then(()=> {
            // Update successful.
            alert('Update successful')
        }).catch((error)=> {
            console.log(error);
            alert('An error happened. Please contact us.');
            // An error happened.
        });
    }

    render() {

        const styles = {
            textInput: {
                width: '100%',
                padding: '2%',
                resize: 'none',
                outline: 'auto',
                color: '#1DA1F2',
                transition: 'all 0.5s linear',
            },
            button:{
                border:'none',
                backgroundColor:'white',
                borderRadius: '50px',
                padding: '25px',
                paddingTop: '10px',
                paddingBottom: '10px',
                fontSize:'15px',
                color: 'black',
                boxShadow:'0px 0px 20px rgba(0, 209, 178, 0.2)',
                margin: '10px',
            },
        };

        return (
            <div>
                <Row className="text-center m-5">
                    <Col>
                        <h1>Hey there!</h1>
                        <p>We take security very seriously.</p>
                        <p>For this reason we need to verify your account with an email sent to your inbox before you can start interacting.</p>
                        <p>All you need to do is open that link and come back here.</p>
                        <hr />
                        <p>If you wish to recieve the verification email once again, please use the button below.</p>
                        <button type="button" className="post-button" onClick={this.reSendVerificationEmail}>Re-send verification</button>
                        <hr />
                        <p>Now, if you would like to change the email (<b>{this.props.authUser.email}</b>) associated with your account type it in the textbox below.</p>
                        <input type="email" placeholder="New email" style={styles.textInput} name="newEmail" id="newEmail" value={this.state.newEmail}
                                    onChange={this.handleInputChange} />
                                    <br />
                        <button type="button" style={styles.button} onClick={this.changeEmail}>Change email</button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default EmailVerification;