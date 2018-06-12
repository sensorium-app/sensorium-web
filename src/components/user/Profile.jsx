import React, { Component } from 'react'
import { Image } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'; 

class Profile extends Component {

    constructor(props, context) {
        super(props,context);
    }

    componentDidUpdate(prevProps) {
        if (this.props.path === this.props.location.pathname && this.props.location.pathname !== prevProps.location.pathname) {
          window.scrollTo(0, 0)
        }
    }

    goBack(){
        this.props.history.push("/");
    }

    render() {
        return (
            <div>
                <Image src="assets/small-header.jpg" className="header-image" />
                <h1>Welcome! Thank you for registering.</h1>
                <a className="btn btn-grad-peach" onClick={this.goBack.bind(this)}>Go back to home page</a>
            </div>
        )
    }
}

export default withRouter(Profile);