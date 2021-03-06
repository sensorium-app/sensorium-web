import React from 'react';
import PropTypes from 'prop-types';
import './style/Alert.css';

const Alert = props => {
  const { type, msg } = props;

  if (type === 'success') {
    return (
        <div className="alert success">
            <span className="closebtn" >&times;</span> 
            {msg}
        </div>
    );
  } 

  else if (type === 'error'){
    return (
        <div className="alert error">
            <span className="closebtn" >&times;</span> 
            {msg}
        </div>
    );
  }
  
  else if (type === 'warning'){
    return (
        <div className="alert warning">
            <span className="closebtn" >&times;</span> 
            {msg}
        </div>
    );
  }
  else{
      return null;
  }
 
};

Alert.propTypes = {
  type: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired,
};

export default Alert;