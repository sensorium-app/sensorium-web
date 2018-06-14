import React from 'react';
import { Form, FormGroup, Label, Input, Col } from 'reactstrap';
import { Link,withRouter } from 'react-router-dom'; 

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

      disabledBtn: false
    };
        
class RegistrationForm extends React.Component {

  constructor(props, context) {
    super(props,context);

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

    /*ga('send', {
      hitType: 'event',
      eventCategory: 'user',
      eventAction: 'register',
      eventLabel: this.state.email
    });*/

    if(!this.state.acceptsTerms){
      console.log('Did not acccept terms');
      alert('Please read and accept our terms and privacy policy');
    }else{

      //const userState = this.state;

      if( 
        (this.state.name && this.state.name.length > 0) &&
        (this.state.email && this.state.email.length > 0) &&
        (this.state.password && this.state.password.length > 0)
      ){

        this.setState({disabledBtn: true});

        firebaseConf.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error)=> {
          var errorCode = error.code;
          var errorMessage = error.message;

          console.log(errorCode);
          console.log(errorMessage);
          var errorToShow = '';
          switch(errorCode){
            case 'auth/weak-password':
              errorToShow = 'Please provide at least a 6 character password';
              break;
            case 'auth/email-already-in-use':
              errorToShow = 'That email has already registered, hang on please.';
              break;
            default:
              errorToShow = 'An error occured on user, please contact us';
              break;
          }

          alert(errorToShow);
          
        });

        firebaseConf.auth().onAuthStateChanged((user) =>{
          if (user) {
            console.log('user signed in');

            const sensate = {
              uid: user.uid,
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

              this.setState(initialState, () => {
                firebaseConf.auth().signOut().then(() =>{
                    this.props.history.push('/profile')
                    console.log('Logged out');
                }).catch((error)=> {
                    console.log(error);
                    alert('An error ocurred, please contact us');
                });
                
              });

            }).catch((err)=>{
              console.log(err);
              alert('An error ocurred, please contact us');
            });

          } else {
            console.log('User signed out');
          }
        });
      }else{
        alert('Please fill in all the required information');
      }
      
    }

  }
  render() {
    
    return (
       <Form className="custom-form">
        <FormGroup row>
{/*          <Label for="exampleEmail" sm={2} className="label">Name</Label>
*/}        <Col sm={6}>
            <Input type="text" required name="name" id="name"     className="input-line" placeholder="Your cool sensate name" 
              value={this.state.name}
              onChange={this.handleInputChange}
            />
          </Col>
          <Col sm={6}>
            <Input type="text" name="lastName" id="lastName" className="input-line" placeholder="Lastname (optional)" 
              value={this.state.lastName}
              onChange={this.handleInputChange}
            />
          </Col>
          <Col sm={6}>
            <Input type="email" required name="email" id="email" className="input-line" placeholder="Email" 
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </Col>
          <Col sm={6}>
            <Input type="password" required name="password" id="password" className="input-line" placeholder="Password" 
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </Col>
          <Col sm={2}></Col>
          <Col sm={8}>
                <label required className="text-left mt-3" htmlFor="date">Date Of Birth</label>
                <br />
                <DatePicker className="DatePicker input-line" id="date"
                    inline
                    selected={this.state.dateTimeOfBirth}
                    onChange={this.handleDateChange}
                    showYearDropdown
                    showMonthDropdown
                    maxTime={moment()}
                    placeholderText="Date Of Birth"
                />
          </Col>
          <Col sm={2}></Col>
        </FormGroup>
        
        <FormGroup row>
          <Col sm={1}>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" id="acceptsTerms" name="acceptsTerms" 
                  value={this.state.acceptsTerms}
                  onChange={this.handleInputChange}/>{' '}
              </Label> 
            </FormGroup>
          </Col>
          <Label for="acceptsTerms" sm={11}>Are you ok with our 
            
            <Link href="/terms" to="/terms"  target="_blank"> Terms and Conditions </Link>
            
            and 
            <Link href="/privacy" to="/privacy" target="_blank"> Privacy Policy </Link>
            ?
          </Label>
        </FormGroup>

        <a className="btn btn-grad-peach" disabled={this.state.disabledBtn} onClick={this.addSensate.bind(this)}>Register!</a>
      </Form>
      
   
    );
  }
}


export default withRouter(RegistrationForm);