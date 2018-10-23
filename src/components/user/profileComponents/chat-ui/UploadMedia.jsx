import React from 'react';
import ReactModal from 'react-modal';
import { Container, Form, FormGroup, Input, Row, Col } from 'reactstrap';

ReactModal.setAppElement('#root')

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      WebkitTransform       : 'translate(-50%, -50%)',
      msTransform           : 'translate(-50%, -50%)',
      textAlign             : 'center',
    },
    overlay: {
        zIndex: 1000,
    },
    responsiveImage:{
        width: '100%',
        maxWidth: '200px',
        height: 'auto',
    }
};

export default class UploadMedia extends React.Component {
    constructor (props) {
      super(props);
      console.log(props)
      this.state ={
          text: '',
          imagePreview : null,
      }

      this.handleInputChange = this.handleInputChange.bind(this);
      this.send = this.send.bind(this);
    }

    componentDidMount(){
        this.setState({
            imagePreview: this.props.files[0].preview
        });
    }
    
    toggleMediaUpload(){
        this.props.toggleMediaUpload();
    }

    send(e){
        e.preventDefault();
        if(this.props.prepareClusterPost){
            this.prepareClusterPost();
        }else{
            this.sendMessageToChat();
        }
    }

    sendMessageToChat(){
        this.props.sendMessageToChat(this.state.text);
        this.toggleMediaUpload();
    }

    prepareClusterPost(){
        this.props.prepareClusterPost(this.state.text);
        this.toggleMediaUpload();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }
    
    render () {
        const { showMediaUpload } = this.props;
        return (
            <div>
            <ReactModal 
                isOpen={showMediaUpload}
                contentLabel="Modal for media upload"
                style={customStyles}
            >
                <h2>Upload media with a message</h2>
                <Form className="custom-form" onSubmit={this.send}>
                    <FormGroup row>
                        <Col sm={12}>
                            <Input type="text" required name="text" id="text" className="input-line" placeholder="Type a message along with your media" 
                            value={this.state.text}
                            onChange={this.handleInputChange}
                            />
                        </Col>
                    </FormGroup>
                </Form>
                <Container>
                    <Row>
                        <Col sm={12}>
                            <img style={customStyles.responsiveImage} src={this.state.imagePreview} />
                        </Col>
                        <Col sm={6}>
                            <button className="btn btn-grad-peach wow bounceIn registerBtn" onClick={this.toggleMediaUpload.bind(this)}>Cancel</button>
                        </Col>
                        <Col sm={6}>
                            <button className="btn btn-grad-peach wow bounceIn registerBtn" type="submit" onClick={this.send}>Send</button>
                        </Col>
                    </Row>
                </Container>
            </ReactModal>
            </div>
        );
    }
  }