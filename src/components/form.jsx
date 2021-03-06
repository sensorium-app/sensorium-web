import React from 'react';
import { Form, FormGroup, Label, Input, Col } from 'reactstrap';
import { Modal } from 'react-bootstrap';
import { Link,withRouter } from 'react-router-dom'; 
import firebaseConf from './../config/FirebaseConfig';
import moment from 'moment';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import './style/style.css';
import './style/form.css';
import SendVerificationEmail from './user/misc/SendVerificationEmail';

const newDate = new Date();
const maxDate = moment(newDate).subtract(18, 'years').toDate();
const minDate = moment(newDate).subtract(100, 'years').toDate();

const initialState = {
      name: '',
      lastName: '',
      secondLastName: '',
      email: '',
      password: '',
      gender: '',
      dateTimeOfBirth: null,
      dateOfBirth: null,
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

      disabledBtn: false,
      modalOpen:false,
      maxDate: maxDate,
      minDate: minDate
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
    this.toggle = this.toggle.bind(this);
  }
  // date Modal
  toggle() {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
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
    const selectedDate = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
    
    this.setState({
      dateOfBirth: selectedDate
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
      console.log('Did not accept Terms');
      alert('Please read and accept the Terms and Conditions before continuing.');
    }else{

      if( 
        (this.state.name && this.state.name.length > 0) &&
        (this.state.email && this.state.email.length > 0) &&
        (this.state.password && this.state.password.length > 0)
      ){

        if(!this.state.dateOfBirth){
          alert('Please select your date of birth');
          return;
        }

        this.setState({disabledBtn: true});

        firebaseConf.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((resValue)=>{
          console.log(resValue);
        }).catch((error)=> {
          var errorCode = error.code;
          var errorMessage = error.message;

          console.log(errorCode);
          console.log(errorMessage);
          var errorToShow = '';
          switch(errorCode){
            case 'auth/weak-password':
              errorToShow = 'The password must be at least six characters.';
              break;
            case 'auth/email-already-in-use':
              errorToShow = 'This email address is already in use.';
              break;
            default:
              errorToShow = 'An error occurred. Please contact us for more information.';
              break;
          }

          alert(errorToShow);
          
        });

        firebaseConf.auth().onAuthStateChanged((user) =>{
          if (user) {
            console.log('User signed in');

            const sensate = {
              uid: user.uid,
              name: this.state.name,
              lastName: this.state.lastName,
              secondLastName:this.state.secondLastName,
              email: this.state.email,
              gender: this.state.gender,
              dateOfBirth: this.state.dateOfBirth,
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

            this.db.collection('sensies').doc(user.uid).set(sensate).then((res)=>{

              SendVerificationEmail(user).then(()=>{
                console.log('SendVerificationEmail done');
              }).catch((err)=>{
                console.log(err);
              });

            }).catch((err)=>{
              console.log(err);
              alert('Registration error. Please contact us for more information.');
            });

          } else {
            console.log('User not logged in.');
          }
        });
      }else{
        alert('Please fill in all of the required information.');
      }
      
    }

  }
  
  render() {
    
    return (
       <Form className="custom-form">
        <FormGroup row>
          <Col sm={6}>
            <Input type="text" required name="name" id="name" className="input-line" placeholder="Sensate First Name" 
              value={this.state.name}
              onChange={this.handleInputChange}
            />
          </Col>
          <Col sm={6}>
            <Input type="text" name="lastName" id="lastName" className="input-line" placeholder="Sensate Last Name (Optional)" 
              value={this.state.lastName}
              onChange={this.handleInputChange}
            />
          </Col>
          <Col sm={6}>
            <Input type="email" required name="email" id="email" className="input-line" placeholder="Email Address" 
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
                <br />
                <a className="btn btn-grad-green" onClick={this.toggle}>Date of birth</a>

                { this.state.modalOpen &&
                  <div className="static-modal">                  
                    <Modal.Dialog className="dateModal">                    
                      
                      <Modal.Body className="calendarStyle">

                        <InfiniteCalendar id="date" className="BBB" selected={this.state.dateTimeOfBirth}
                            rowHeight={70}
                            displayOptions={{
                              layout: 'portrait'
                             }}
                             width={320}
                             height={400}

                            display="years"
                            maxDate={this.state.maxDate}
                            minDate={this.state.minDate}
                            min={this.state.minDate}
                            onSelect={this.handleDateChange}
                        />
                      </Modal.Body>
                      <Modal.Header onClick={this.toggle}>
                      <a className="btn btn-grad-blue"  onClick={this.toggle}>Cancel</a>
                      <a className="btn btn-grad-peach"  onClick={this.toggle}>Submit</a>
                      </Modal.Header>
                    </Modal.Dialog>
                  </div>
                }
                
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
          <Label for="acceptsTerms" sm={11}>Do you agree with the
            
            <Link href="/terms" to="/terms"  target="_blank"> Terms and Conditions </Link>
            
            and 
            <Link href="/privacy" to="/privacy" target="_blank"> Privacy Policy </Link>
            set out by Sensorium Online?
          </Label>
        </FormGroup>

        <a className="btn btn-grad-peach" disabled={this.state.disabledBtn} onClick={this.addSensate.bind(this)}>Register!</a>
      </Form>
   
    );
  }
}


export default withRouter(RegistrationForm);