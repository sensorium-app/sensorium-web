import React from 'react';
import PropTypes from 'prop-types';
import ProfilePhoto from '../ProfilePhoto';
import '../../../style/style.css';
import './style/post.css';

const PostHeader = (props) => (
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
    )

ProfileDetails.propTypes = {
    name: PropTypes.string.isRequired,
    
}

export default PostHeader
