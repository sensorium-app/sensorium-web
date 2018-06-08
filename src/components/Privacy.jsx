import React, { Component } from 'react'
import { Grid, Col, Image } from 'react-bootstrap';
import './style/terms.css';

export default class Privacy extends Component {
  render() {
    return (
      <div>
        <Image src="assets/s8.jpg" className="header-image" />
        <Grid>
          <Col xs={12} sm={8} smOffset={2}>
            <Image src="assets/infinty.png" className=" img-fluid about-profile-pic" rounded />
            

<h3>            Contacting Us
</h3>
If there are any questions regarding this Terms and conditions, you may contact us using the information below.
<br/>
sensorium.online<br/>
support@sensorium.online<br/>

Last Edited on 2018-06-08

          </Col>
        </Grid>
      </div>
    )
  }
}
