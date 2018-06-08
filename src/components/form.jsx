import React from 'react';
import { Button,  Form, FormGroup, Label, Input, FormText,Col } from 'reactstrap';
import FontAwesomeIcon from 'react-fontawesome'

import 'firebase/firestore'
import firebaseConf from './../config/FirebaseConfig';

import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import './style/style.css';
import './style/form.css';

class RegistrationForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      lastName: '',
      secondLastName: '',
      email: '',
      gender: '',
      dateTimeOfBirth: moment().subtract(18, 'years'),
      languagesSpoken: {},
        
      dateOfBirthCluster: true,
      monthAndDayCluster: false,
      monthAndYearCluster: false,
      monthCluster: false,
      skillsCluster: false,
      hobbiesCluster: false,
      interestsCluster: false,

      skills: {},
      hobbies: {},
      interests: {},

      acceptsTerms: false,

      items: [],
      focused: false,
      input: ''
    };

    this.db = firebaseConf.firestore();
    const settings = { timestampsInSnapshots: true};
    this.db.settings(settings);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);

    this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    
  }

  /** Generic function for state management of input elements */
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
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

  handleDateChange(date) {
    this.setState({
      dateTimeOfBirth: date
    });
  }

  addSensate(e){
    console.log(e);
    console.log(this.state);

    if(!this.state.acceptsTerms){
      console.log('Did not acccept terms');
    }else{
      const sensate = {
        name: this.state.name,
        lastName: this.state.lastName,
        secondLastName:this.state.secondLastName,
        email: this.state.email,
        gender: this.state.gender,
        dateTimeOfBirth: this.state.dateTimeOfBirth.toDate(),
        skills:{},
        hobbies: {},
        interests:{},
        languagesSpoken:{},
        desiredClusters: {
            dateTimeOfBirth: this.state.dateOfBirthCluster,
            monthAndDay: this.state.monthAndDayCluster,
            monthAndYear: this.state.monthAndYearCluster,
            month: this.state.monthCluster,
            skills: this.state.skillsCluster,
            hobbies: this.state.hobbiesCluster,
            interests: this.state.interestsCluster
        }
      };

      console.log(sensate);

      this.db.collection('sensates').add(sensate).then((res)=>{
        console.log(res);
      }).catch((err)=>{
        console.log(err);
      });
    }

  }

  render() {
    
    return (
       <Form className="custom-form">
        <FormGroup row>
{/*          <Label for="exampleEmail" sm={2} className="label">Name</Label>
*/}          <Col sm={6}>
            <Input type="text" name="name" id="name" className="input-line" placeholder="Your cool sensate name" 
              value={this.state.name}
              onChange={this.handleInputChange}
            />
          </Col>
          <Col sm={6}>
            <Input type="text" name="lastName" id="lastName" className="input-line" placeholder="Lastname? Not necessary though" 
              value={this.state.lastName}
              onChange={this.handleInputChange}
            />
          </Col>
          <Col sm={6}>
            <Input type="text" name="email" id="email" className="input-line" placeholder="Your email" 
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
{/*          <Label for="examplePassword" sm={2} className="label">Last Name</Label>
*/}          
        </FormGroup>
        <FormGroup row>
              <Col sm={12}>
                
                <DatePicker
                    selected={this.state.dateTimeOfBirth}
                    onChange={this.handleDateChange}
                    showYearDropdown
                    showMonthDropdown
                    maxTime={moment()}
                    placeholderText="Date of birth"
                />
              </Col>
        </FormGroup>
        
        <FormGroup row>
          <Label for="acceptsTerms" sm={10}>Accept our terms and privacy policy?</Label>
          <Col sm={2}>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" id="acceptsTerms" name="acceptsTerms" 
                  value={this.state.acceptsTerms}
                  onChange={this.handleInputChange}/>{' '}
                  Yes
              </Label>
            </FormGroup>
          </Col>
        </FormGroup>
        <Button onClick={this.addSensate.bind(this)}>Join!</Button>
      </Form>
    );
  }
}


export default RegistrationForm;