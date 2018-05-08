import React from 'react';
import { Button,  Form, FormGroup, Label, Input, FormText,Col } from 'reactstrap';
import FontAwesomeIcon from 'react-fontawesome'

import './style/style.css';
import './style/form.css';
class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      focused: false,
      input: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
  }

handleInputChange(evt) {
    this.setState({ input: evt.target.value });
  }

  handleInputKeyDown(evt) {
    if ( evt.keyCode === 13 ) {
      const {value} = evt.target;
      
      this.setState(state => ({
        items: [...state.items, value],
        input: ''
      }));
    }

    if ( this.state.items.length && evt.keyCode === 8 && !this.state.input.length ) {
      this.setState(state => ({
        items: state.items.slice(0, state.items.length - 1)
      }));
    }
  }

  handleRemoveItem(index) {
    return () => {
      this.setState(state => ({
        items: state.items.filter((item, i) => i !== index)
      }));
    }
  }

  render() {
    
    return (
       <Form className="custom-form">
        <FormGroup row>
{/*          <Label for="exampleEmail" sm={2} className="label">Name</Label>
*/}          <Col sm={6}>
            <Input type="text" name="firstName" id="firstName" className="input-line" placeholder="YOUR COOL NAME" />
          </Col>
          <Col sm={6}>
            <Input type="text" name="lastName" id="lastName" className="input-line" placeholder="Last Name? not nessesary though" />
          </Col>
        </FormGroup>
        <FormGroup row>
{/*          <Label for="examplePassword" sm={2} className="label">Last Name</Label>
*/}          
        </FormGroup>
        <FormGroup row>
{/*          <Label for="genderSelect" sm={2}>Gender</Label>
*/}           <Col sm={6}>
                <select name="gender" className="btn grad-select">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Gay">Gay</option>
                  <option value="Bi">Bi</option>
                </select>          
              </Col>
              <Col sm={6}>
                <Input type="text" name="age" id="age" className="input-line" placeholder="Tell me how old are you?" />
              </Col>
        </FormGroup>
        <FormGroup row>
        <label>
        <ul className="tag-container">
          {this.state.items.map((item, i) => 
            <li key={i} className="tag-pill" onClick={this.handleRemoveItem(i)}>
              {item}
              <span className="close-pill">x  <FontAwesomeIcon icon="times" /> </span>
            </li>
          )}
          <input
            value={this.state.input}
            onChange={this.handleInputChange}
            onKeyDown={this.handleInputKeyDown} 
            className="pill-input" />
        </ul>
      </label>
          {/*<Label for="exampleSelectMulti" sm={2}>Select Multiple</Label>
          <Col sm={10}>
            <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple />
          </Col>*/}
        </FormGroup>
        <FormGroup row>
          <Label for="exampleText" sm={2}>Text Area</Label>
          <Col sm={10}>
            <Input type="textarea" name="text" id="exampleText" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleFile" sm={2}>File</Label>
          <Col sm={10}>
            <Input type="file" name="file" id="exampleFile" />
            <FormText color="muted">
              This is some placeholder block-level help text for the above input.
              It's a bit lighter and easily wraps to a new line.
            </FormText>
          </Col>
        </FormGroup>
        <FormGroup tag="fieldset" row>
          <legend className="col-form-label col-sm-2">Radio Buttons</legend>
          <Col sm={10}>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio2" />{' '}
                Option one is this and that—be sure to include why it's great
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio2" />{' '}
                Option two can be something else and selecting it will deselect option one
              </Label>
            </FormGroup>
            <FormGroup check disabled>
              <Label check>
                <Input type="radio" name="radio2" disabled />{' '}
                Option three is disabled
              </Label>
            </FormGroup>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="checkbox2" sm={2}>Checkbox</Label>
          <Col sm={{ size: 10 }}>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" id="checkbox2" />{' '}
                Check me out
              </Label>
            </FormGroup>
          </Col>
        </FormGroup>{/*
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button>Submit</Button>
          </Col>
        </FormGroup>*/}
      </Form>
    );
  }
}


export default RegistrationForm;