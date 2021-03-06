import React from 'react';
import PropTypes from 'prop-types';
import './styles/profilephoto.css';

const ProfilePhoto = (props) => (
  <div className='profile-photo'>
    <img src={props.image} alt='Profile' className="img-fluid circle"/>
  </div>
)

ProfilePhoto.propTypes = {
  image: PropTypes.string
}

export default ProfilePhoto;
