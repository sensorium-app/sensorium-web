import React from 'react';
import PropTypes from 'prop-types';
import './style/Alert.css';

const Alert = props => {
  const { type, msg } = props;

  if (type === 'success') {
    return (
        <div class="alert success">
            <span class="closebtn" >&times;</span> 
            {msg}
        </div>
    );
  } 

  else if (type === 'error'){
    return (
        <div class="alert error">
            <span class="closebtn" >&times;</span> 
            {msg}
        </div>
    );
  }
  
  else if (type === 'warning'){
    return (
        <div class="alert warning">
            <span class="closebtn" >&times;</span> 
            {msg}
        </div>
    );
  }
  else{
      return null;
  }
 
};

Alert.PropTypes = {
  type: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired,
};

export default Alert;