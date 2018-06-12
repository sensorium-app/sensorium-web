import React, { Component } from 'react'
import { Image } from 'react-bootstrap';

export default class Login extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {

        return (
            <div>
                <Image src="assets/small-header.jpg" className="header-image" />
                <h1>Login</h1>
            </div>
        )
    }
}