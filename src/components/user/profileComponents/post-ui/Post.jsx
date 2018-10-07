import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ProfilePhoto from '../ProfilePhoto';
import ProfileDetails from '../ProfileDetails';
import '../../../style/style.css';
import './style/post.css';

class Post extends Component {
    render() {
      const { userData, text, date } = this.props;
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
          <div className="Post-image">
            <div className="Post-image-bg">
              <img alt="Icon Living" src="https://source.unsplash.com/800x800" />
            </div>
          </div>
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