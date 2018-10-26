import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import SendVerificationEmail from './../../misc/SendVerificationEmail';
import firebaseConf from './../../../../config/FirebaseConfig';

class EmailVerification extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            newEmail: '',
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.reSendVerificationEmail = this.reSendVerificationEmail.bind(this);
        this.logout = this.logout.bind(this);
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
        SendVerificationEmail().then((response)=>{
            alert('Email sent succesfully');
        }).catch((err)=>{
            alert('An error happened. Please contact us.')
        });
    }

    logout(){
        firebaseConf.auth().signOut().then(()=> {
            
            //this.props.history.push("/");

        }).catch((error)=> {
            console.log(error);
            alert('An error occurred during sign-out.');
            //this.props.history.push("/");
        });
    }

    render() {

        const styles = {
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
                        <p>All you need to do is open that link and follow the link.</p>
                        <p>This is the email (<b>{this.props.authUser.email}</b>) associated with your account.</p>
                        <hr />
                        <p>If you wish to recieve the verification email once again, please use the button below.</p>
                        <button type="button" style={styles.button} onClick={this.reSendVerificationEmail}>Re-send verification</button>
                        <br />
                        <button type="button" style={styles.button} onClick={this.logout}>Logout</button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default EmailVerification;