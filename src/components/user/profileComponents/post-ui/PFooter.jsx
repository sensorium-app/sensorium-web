import React, { Component } from "react";
import PropTypes from 'prop-types';
import styles from './styles';
import './style/post.css';

const PFooter = (props) =>(

    <div className="Post-caption">
         <p style={styles.postCaption}>{props.postcaption}</p>

        <div className="Post-console">
            <i className="fa fa-reply"></i> &nbsp;
            {
                (props.commentCount > 0) && 
                    props.commentCount
            }
            <i className="fa fa-heart" onClick={props.addLike}></i> &nbsp;
            {
                (props.likeCount > 0) && 
                    props.likeCount
            }
        </div>
        
    </div>

)

PFooter.propTypes = {
  postcaption: PropTypes.string.isRequired
}

export default PFooter

