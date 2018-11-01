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

import firebaseConf, {firebase} from './../../../../config/FirebaseConfig';
import randomColor from 'randomcolor';

class Post extends Component {

    constructor(props){
      super(props);
      console.log(props)
      this.state = {
        imageUrl: null,
        class: 'caption'
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

      this.db = firebaseConf.firestore();
    }
    
    render() {
      const { userName, userAvatar, userId, text, date, commentCount, likeCount } = this.props;
      let postText;
      if(this.state.imageUrl != undefined) {
       postText =   <div className="caption">
          <PFooter postcaption={text} />
          </div>
      }
      else{
        postText =   <div className="qoute">
          <PFooter postcaption={text} />
          </div>
      } 
      return <article className="Post" ref="Post" style={{...styles.post, ...{'borderLeft': '1.2px solid ' + randomColor()}} }>
          <PHeader name={userName} image={userAvatar} 
            timestamp={'Shared at ' + new Date(date).toLocaleDateString() +' - '+ new Date(date).getHours()+' : '+new Date(date).getMinutes()}
          />
          
          {

          this.state.imageUrl && 
            <div>
              <img alt="" className="Post-image" src={this.state.imageUrl} />
            </div>
          }

           
          {postText}

          {
            (commentCount > 0) && 
              <p>Comments: {commentCount}</p>
          }
          {
            (likeCount > 0) && 
              <p>Likes: {likeCount}</p>
          }
        </article>;
      }
      
  }

  Post.propTypes = {
    userName: PropTypes.string.isRequired,
    userAvatar: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.object.isRequired,
    commentCount: PropTypes.number.isRequired,
    likeCount:  PropTypes.number.isRequired,
    clusterId: PropTypes.string.isRequired,
    postId:  PropTypes.string.isRequired,
  }
  export default Post;