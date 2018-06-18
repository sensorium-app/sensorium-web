import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Row, Col, Card, CardTitle, CardText } from 'reactstrap';
import { Image } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'; 
import firebaseConf from './../../config/FirebaseConfig';

const initialState = {
    email: '',
    password: '',
    redirectToProfile: false
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

        firebaseConf.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
            alert('Error logging in, please contact us');
        });

        /*firebaseConf.auth().onAuthStateChanged(function(user) {
            if (user) {
                this.setState({
                    redirectToProfile: true
                })
            }
          });*/
        
    }

    render() {

        return (
            
            <div>
                <br /><br /><br />
                <div className="container">           
                    <Row>
                        <Col sm="6">
                            <div className="panel panel-primary text-center">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Welcome Back!</h3>
                                </div>
                                <div className="panel-body">
                                    <p>The archipelago and psycellium awaits.</p>
                                    <Image src="assets/infinty.png" className=" img-fluid about-profile-pic" rounded />
                                </div>
                            </div>
                        </Col>
                        <Col sm="6">
                            <div className="panel panel-primary text-center">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Login sensate</h3>
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
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>

                {this.state.redirectToProfile && <Redirect to="/profile"/>}
            </div>
        )
    }
}