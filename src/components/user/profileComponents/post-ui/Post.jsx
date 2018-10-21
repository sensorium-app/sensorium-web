import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ProfilePhoto from '../ProfilePhoto';
import ProfileDetails from '../ProfileDetails';
import '../../../style/style.css';
import './style/post.css';
import PHeader from './PHeader';
import PFooter from './PFooter';
import styles from './styles';

import {firebase} from './../../../../config/FirebaseConfig';
import randomColor from 'randomcolor';

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
            this.setState({
              imageUrl: url,
            });
        });
      }
    }

    render() {
      const { userData, text, date } = this.props;
      return <article className="Post" ref="Post" style={{...styles.post, ...{'borderLeft': '1.2px solid ' + randomColor()}} }>
          <PHeader name={userData.name} image={userData.avatar} 
            timestamp={'Shared at ' + new Date(date).toLocaleDateString() +' - '+ new Date(date).getHours()+' : '+new Date(date).getMinutes()}
          />

          {
            this.state.imageUrl && 
            <div className="Post-image">
              <img alt="" src={this.state.imageUrl} />
            </div>
          }

           <PFooter postcaption={text}/>
          <div className="Post-caption">
           
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