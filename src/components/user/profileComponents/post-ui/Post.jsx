import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ProfilePhoto from '../ProfilePhoto';
import ProfileDetails from '../ProfileDetails';
import '../../../style/style.css';
import './style/post.css';
import firebaseConf, {firebase} from './../../../../config/FirebaseConfig';

class Post extends Component {

    constructor(props){
      super(props);
      this.state = {
        imageUrl: null
      };

      if(this.props.imagePath){
        var storage = firebase.storage();
        var storageRef = storage.ref(this.props.imagePath);
        storageRef.getDownloadURL().then((url)=> {
            console.log(url);
            this.setState({
              imageUrl: url,
            })
        });
      }
    }

    render() {
      const { userData, text, date, imageUrl } = this.props;
      return <article className="Post" ref="Post">
          <header>
            <div className="Post-user">
              <div className="Post-user-avatar">
                <ProfilePhoto image={userData.avatar} />
              </div>
              <div className="Post-user-nickname">
                <span><ProfileDetails name={userData.name} /></span>
              </div>
            </div>
          </header>
          {
            this.state.imageUrl && 
            <div className="Post-image">
              <div className="Post-image-bg">
                <img alt="postImage" src={this.state.imageUrl} />
              </div>
            </div>
          }
          <div className="Post-caption">
            {text + ' ' + new Date(date)}
          </div>
        </article>;
      }
      
  }

  Post.propTypes = {
    userData: PropTypes.object.isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.object.isRequired,
  }
  export default Post;