import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ProfilePhoto from '../ProfilePhoto';
import ProfileDetails from '../ProfileDetails';
import '../../../style/style.css';
import './style/post.css';
import firebaseConf, {firebase} from '../../../../config/FirebaseConfig';
class Post extends Component {
    render() {
      return <article className="Post" ref="Post">
          <header>
            <div className="Post-user">
              <div className="Post-user-avatar">
                <ProfilePhoto image={this.props.photo} />
              </div>
              <div className="Post-user-nickname">
                <span><ProfileDetails name={this.props.name} /></span>
              </div>
            </div>
          </header>
          <div className="Post-image">
            <div className="Post-image-bg">
              <img alt="Icon Living" src="https://source.unsplash.com/800x800" />
            </div>
          </div>
          <div className="Post-caption">
          <ProfileDetails name={this.props.name} /> Some caption
          </div>
        </article>;
      }
      
  }

  Post.propTypes = {
    photo: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }
  export default Post;