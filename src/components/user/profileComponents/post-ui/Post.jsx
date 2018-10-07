import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ProfilePhoto from '../ProfilePhoto';
import ProfileDetails from '../ProfileDetails';
import '../../../style/style.css';
import './style/post.css';
import firebaseConf, {firebase} from '../../../../config/FirebaseConfig';
import PHeader from './PHeader';
import styles from './styles';

class Post extends Component {
    render() {
      return <article className="Post" ref="Post" style={styles.post}>
          <PHeader image={this.props.photo} name={this.props.name}/>
          <div className="Post-image">
            <div className="Post-image-bg">
              <img alt="Icon Living" src="https://source.unsplash.com/800x800" />
            </div>
          </div>
          
        </article>;
      }
      
  }

  Post.propTypes = {
    photo: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }
  export default Post;