import React from 'react';
import { Button,  Form, FormGroup, Label, Input, FormText,Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import 'firebase/firestore'
import firebaseConf from './../config/FirebaseConfig';

import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import './style/style.css';
import './style/form.css';

const initialState = {
      name: '',
      lastName: '',
      secondLastName: '',
      email: '',
      password: '',
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

class RegistrationForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = initialState;

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
    console.log(this.state);

    if(!this.state.acceptsTerms){
      console.log('Did not acccept terms');
    }else{

      const userState = this.state;
      const dbCollection = this.db.collection('sensates');

      firebaseConf.auth().createUserWithEmailAndPassword(userState.email, userState.password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode);
        console.log(errorMessage);
      });

      firebaseConf.auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log('user signed in');

          const sensate = {
            uid: user.uid,
            name: userState.name,
            lastName: userState.lastName,
            secondLastName:userState.secondLastName,
            email: userState.email,
            gender: userState.gender,
            dateTimeOfBirth: userState.dateTimeOfBirth.toDate(),
            skills:{},
            hobbies: {},
            interests:{},
            languagesSpoken:{},
            desiredClusters: {
                dateTimeOfBirth: userState.dateOfBirthCluster,
                monthAndDay: userState.monthAndDayCluster,
                monthAndYear: userState.monthAndYearCluster,
                month: userState.monthCluster,
                skills: userState.skillsCluster,
                hobbies: userState.hobbiesCluster,
                interests: userState.interestsCluster
            }
          };

          console.log(sensate);

          dbCollection.add(sensate).then((res)=>{
            console.log(res);
            //this.setState(initialState);
          }).catch((err)=>{
            console.log(err);
          });

        } else {
          console.log('User signed out');
        }
      });
      
    }

  }
  render() {
    
    return (
       <Form className="custom-form">
        <FormGroup row>
{/*          <Label for="exampleEmail" sm={2} className="label">Name</Label>
*/}          <Col sm={6}>
            <Input type="text" required name="name" id="name" className="input-line" placeholder="Your cool sensate name" 
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
            <Input type="email" required name="email" id="email" className="input-line" placeholder="Your email" 
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </Col>
          <Col sm={6}>
            <Input type="password" required name="password" id="password" className="input-line" placeholder="Your password" 
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </Col>
          <Col sm={6}>
                <label required className="text-left mt-3">Date Of Birth</label>
                <DatePicker className="DatePicker"
                    selected={this.state.dateTimeOfBirth}
                    onChange={this.handleDateChange}
                    showYearDropdown
                    showMonthDropdown
                    maxTime={moment()}
                    placeholderText="Date Of Birth"
                />
              </Col>
        </FormGroup>
        <FormGroup row>
{/*          <Label for="examplePassword" sm={2} className="label">Last Name</Label>
*/}          
        </FormGroup>
        {/* <FormGroup row>
              <Col sm={12}>
                
                <DatePicker className="DatePicker"
                    selected={this.state.dateTimeOfBirth}
                    onChange={this.handleDateChange}
                    showYearDropdown
                    showMonthDropdown
                    maxTime={moment()}
                    placeholderText="Date Of Birth"
                />
              </Col>
        </FormGroup> */}
        
        <FormGroup row>
          <Label for="acceptsTerms" sm={10}>Are you ok with our 
            
            <Link href="/Terms" to="/Terms" onClick={this.handleShow} target="_blank"> Terms and Conditions </Link>
            
            and 
            <Link href="/Privacy" to="/Privacy" target="_blank"> Privacy Policy </Link>
            ?
          </Label>
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
        <a className="btn btn-grad-peach" onClick={this.addSensate.bind(this)}>Register!</a>
      </Form>
      
   
    );
  }
}


export default RegistrationForm;