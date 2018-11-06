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
      this.state = {
        imageUrl: null,
        class: 'caption',
        userIsOwner: false,
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

    componentDidMount(){
      this.isUserOwner();
    }

    isUserOwner(){
      if(this.props.authUser.uid === this.props.userId){
        this.setState({
          userIsOwner: true,
        })
      }else{
        this.setState({
          userIsOwner: false,
        })
      }
    }
    
    render() {
      const { userName, userAvatar, userId, text, date, commentCount, likeCount, addLike, authUser, deletePost, togglePostDetailModal } = this.props;
      let postText;
      if(this.state.imageUrl != undefined) {
       postText =   <div className="caption">
          <PFooter postcaption={text} addLike={addLike} commentCount={commentCount} likeCount={likeCount} />
          </div>
      }
      else{
        postText =   <div className="qoute">
          <PFooter postcaption={text} addLike={addLike} commentCount={commentCount} likeCount={likeCount} />
          </div>
      } 
      return <article className="Post" ref="Post" style={{...styles.post, ...{'borderLeft': '1.2px solid ' + randomColor()}} }>
          <PHeader name={userName} image={userAvatar} 
            timestamp={'Shared at ' + new Date(date).toLocaleDateString() +' - '+ new Date(date).getHours()+' : '+new Date(date).getMinutes()}
            userIsOwner={this.state.userIsOwner} deletePost={deletePost} togglePostDetailModal={togglePostDetailModal}
          />
          
          {

          this.state.imageUrl && 
            <div>
              <img alt="" className="Post-image" src={this.state.imageUrl} />
            </div>
          }
   
          {postText}

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