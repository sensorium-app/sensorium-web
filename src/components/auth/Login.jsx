import React, { Component } from 'react'
import { Input, Row, Col } from 'reactstrap';
import { Image } from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom'; 

import firebaseConf from './../../config/FirebaseConfig';
import '../style/style.css';
import '../style/form.css';

const initialState = {
    email: '',
    password: '',
    redirectToProfile: false,
    emailForRecovery: '',
    showResetPassword: false
}

export default class Login extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = initialState;

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    login(){

        if(this.state.email && this.state.password){
            firebaseConf.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
                alert('Please provide your correct email and password');
            });
        }else{
            alert('Please type your email and password');
        }
                
    }

    resetPwd(){
        if(this.state.emailForRecovery){
            firebaseConf.auth().sendPasswordResetEmail(this.state.emailForRecovery).then(() =>{
                alert('Please check your email for the following steps');
                this.toggleResetPassword();
                this.setState({emailForRecovery: ''})
            }).catch((error) =>{
                console.log(error);
                alert('Error resetting password, please contact us');
            });
        }else{
            alert('Please type your email');
        }
    }

    toggleResetPassword(){
        this.setState({showResetPassword: !this.state.showResetPassword});
    }

    render() {

        return (
            
            <div>
                {this.state.redirectToProfile && <Redirect to="/profile"/>}
                <br /><br /><br />
                <div className="">           
                    <Row>
                        { !this.state.showResetPassword ?
                            <Col sm="4" className="mt-5 col-sm-offset-4">
                                <div className="panel mt-5 bg-grad-blue text-center">
                                    <div className="p-5">
                                        <h2 className="login-panel-heading">Welcome!</h2>
                                        <h3 className="login-panel-heading">We are so excited to see you again</h3>
                                    </div>
                                    <div className="panel-body">
                                        <Row>
                                            <Col sm={12}>
                                                <Input type="email" required name="email" id="email" className="input-line" placeholder="Email" 
                                                value={this.state.email}
                                                onChange={this.handleInputChange}
                                                />
                                            </Col>
                                            <Col sm={12}>
                                                <Input type="password" required name="password" id="password" className="input-line" placeholder="Password" 
                                                value={this.state.password}
                                                onChange={this.handleInputChange}
                                                />
                                            </Col>
                                        
                                            <a className="btn btn-grad-peach" enabled={this.state.email && this.state.password} onClick={this.login.bind(this)}>Login</a>
                                        </Row>
                                        <br />
                                        <Row>
                                            <Col sm={6}>
                                                <a href="#" onClick={this.toggleResetPassword.bind(this)}>Forgot your Password?</a>
                                            </Col>
                                            <Col sm={6}>
                                                Need an account? 
                                                <Link href="/" to="/#form">
                                                Register
                                                </Link>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                            : null
                        }
                        { this.state.showResetPassword ? 
                            <Col sm="6">
                                <div className="panel text-center">
                                    <div className="panel-heading bg-grad-blue p-5">
                                        <h3 className="panel-title">Reset password</h3>
                                    </div>
                                    <div className="panel-body">
                                        <Row>
                                            <Col sm={12}>
                                                <Input type="email" required name="emailForRecovery" id="emailForRecovery" className="input-line" placeholder="Email" 
                                                value={this.state.emailForRecovery}
                                                onChange={this.handleInputChange}
                                                />
                                            </Col>
                                        
                                            <a className="btn btn-grad-peach" enabled={this.state.emailForRecovery} onClick={this.resetPwd.bind(this)}>Reset password</a>
                                        </Row>
                                        <br />
                                        <Row>
                                            <Col sm={12}>
                                                <a href="#" onClick={this.toggleResetPassword.bind(this)}>Login instead</a>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                            : null 
                        } 
                        
                    </Row>
                </div>

            </div>
        )
    }
}