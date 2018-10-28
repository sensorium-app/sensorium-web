import React, { Component } from 'react';
import ReactDOM, {render} from 'react-dom';
import { Input, Row, Col } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom'; 
import Particles from 'react-particles-js';

import firebaseConf from './../../config/FirebaseConfig';
import '../style/style.css';
import '../style/form.css';
import { Alert } from 'reactstrap';

const initialState = {
    email: '',
    password: '',
    redirectToProfile: false,
    emailForRecovery: '',
    showResetPassword: false,
    visible: false,
    errorMessage: '',
}

export default class Login extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = initialState;

        this.handleInputChange = this.handleInputChange.bind(this);
        this.login = this.login.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss() {
        this.setState({ visible: false });
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
            firebaseConf.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((error)=> {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                var errorToShow = '';
                switch(errorCode){
                    case 'auth/invalid-email':
                        errorToShow = 'Please type in a valid email';
                        break;
                    case 'auth/wrong-password':
                        errorToShow = 'Please type in a valid email and/or password';
                        break;
                    default:
                        errorToShow = 'Error loging in. Please reset your password or contact us.';
                }
                console.log(errorCode, errorToShow)
                this.setState({
                    visible: true,
                    errorMessage: errorToShow,
                })
            });
        }else{
            console.log('Please provide your login credentials');
        }
                
    }

    resetPwd(){
        if(this.state.emailForRecovery){
            firebaseConf.auth().sendPasswordResetEmail(this.state.emailForRecovery).then(() =>{
                alert('error');
                this.toggleResetPassword();
                this.setState({emailForRecovery: ''})
            }).catch((error) =>{
                console.log(error);
            });
        }else{
            alert('Please type your email.');
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
                <div>           
                    <Row>
                    <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
                        { this.state.errorMessage }
                    </Alert>
                    

                    <div className="particles">
                        <Particles 
                            params={{                                
                                    particles: {
                                      number: {
                                        value: 40,
                                        density: {
                                          enable: true,
                                          value_area: 800
                                        }
                                      },
                                        color: {
                                        value: "#000000"
                                      },
                                      
                                      line_linked: {
                                        enable: true,
                                        distance: 150,
                                        color: "#000000",
                                        opacity: 0.4,
                                        width: 1
                                      },
                                      move: {
                                        enable: true,
                                        speed: 6,
                                        direction: "none",
                                        random: false,
                                        straight: false,
                                        out_mode: "out",
                                        bounce: false,
                                        attract: {
                                          enable: false,
                                          rotateX: 600,
                                          rotateY: 1200
                                        }
                                        },
                                        interactivity: {
                                        detect_on: "window",
                                        events: {
                                            onhover: {
                                            enable: true,
                                            mode: "grab"
                                            },
                                            onclick: {
                                            enable: true,
                                            mode: "push"
                                            },
                                            resize: true
                                        },
                                        modes: {
                                            grab: {
                                            distance: 170.41996348143653,
                                            line_linked: {
                                                opacity: 1
                                            }
                                            }
                                            
                                        }
                                        }
                                    
                                }}}
                                style={{
                                    width: '100%',
                                    height: '100%'
                                    
                                }}
                            />
                        </div>
                        { !this.state.showResetPassword ?
                            <Col sm="4" className="mt-5 col-sm-offset-4">
                                <div className="panel mt-5 bg-grad-blue text-center">
                                    <div className="p-5">
                                        <h2 className="login-panel-heading">Welcome Back!</h2>
                                        <h3 className="login-panel-heading">We are so excited to see you again.</h3>
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
                                        
                                            <button type="submit" className="btn btn-grad-peach" enabled={this.state.email && this.state.password} onClick={this.login}>Login</button>
                                        </Row>
                                        <br />
                                        <Row>
                                            <Col sm={6}>
                                                <a tabIndex="0" onClick={this.toggleResetPassword.bind(this)}>Forgot your password?</a>
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
                            <Col sm="4"  className="mt-5 col-sm-offset-4">
                                <div className="panel text-center">
                                    <div className="panel-heading bg-grad-blue p-5">
                                        <h3 className="panel-title">Reset Password</h3>
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
                                                <a tabIndex="0" onClick={this.toggleResetPassword.bind(this)}>Login instead</a>
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