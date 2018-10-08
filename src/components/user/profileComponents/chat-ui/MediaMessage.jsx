import React, { Component } from "react";
import PropTypes from 'prop-types';
import {
    MessageMedia,
} from '@livechat/ui-kit';
import {firebase} from './../../../../config/FirebaseConfig';

class MediaMessage extends Component {

    constructor(props){
      super(props);
      this.state = {
        imageUrl: null
      };

      if(this.props.imagePath){
        var storage = firebase.storage();
        var storageRef = storage.ref(this.props.imagePath);
        storageRef.getDownloadURL().then((url)=> {
            this.setState({
              imageUrl: url,
            });
        });
      }
    }

    render() {
      return (
        <MessageMedia>
            <img src={this.state.imageUrl} />
        </MessageMedia>      
      )
    }
      
  }

  MediaMessage.propTypes = {
    imagePath: PropTypes.string.isRequired,
  }
  export default MediaMessage;