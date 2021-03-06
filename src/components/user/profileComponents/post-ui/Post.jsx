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
        textEdit: '',
        editMode: false,
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
      this.editPost = this.editPost.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.toggleEditMode = this.toggleEditMode.bind(this);
    }

    componentDidMount(){
      this.isUserOwner();

      this.setState({
        textEdit: this.props.text,
      })
    }

    componentWillReceiveProps(nextProps){
      if(nextProps.text!==this.props.text){
        //Perform some operation
        this.setState({
          textEdit: nextProps.text,
        });
      }
    }

    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
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
    
    editPost(e){
      e.preventDefault();
      this.props.editPost(this.state.textEdit);
      this.props.togglePostDetailModal();
      //this.toggleEditMode();
    }

    toggleEditMode(){
      this.setState((state)=>{
        return {
          editMode: !state.editMode,
        }
      })
    }
    
    render() {
      const { userName, userAvatar, userId, text, date, commentCount, likeCount, addLike, authUser, 
        deletePost, togglePostDetailModal } = this.props;
      let postText;
      if(this.state.imageUrl != undefined) {
       postText =   <div className="caption">
          <PFooter postcaption={this.state.textEdit} addLike={addLike} commentCount={commentCount} likeCount={likeCount} 
            userIsOwner={this.state.userIsOwner} handleInputChange={this.handleInputChange} 
            editMode={this.state.editMode} />
          </div>
      }
      else{
        postText =   <div className="qoute">
          <PFooter postcaption={this.state.textEdit} addLike={addLike} commentCount={commentCount} likeCount={likeCount} 
            userIsOwner={this.state.userIsOwner} handleInputChange={this.handleInputChange} 
            editMode={this.state.editMode} />
          </div>
      } 
      return <article className="Post" ref="Post" style={{...styles.post, ...{'borderLeft': '1.2px solid ' + randomColor()}} }>
          <PHeader name={userName} image={userAvatar} 
            timestamp={'Shared at ' + new Date(date).toLocaleDateString() +' - '+ new Date(date).getHours()+' : '+new Date(date).getMinutes()}
            userIsOwner={this.state.userIsOwner} deletePost={deletePost} togglePostDetailModal={togglePostDetailModal}
            editMode={this.state.editMode} toggleEditMode={this.toggleEditMode}
          />
          
          {

          this.state.imageUrl && 
            <div>
              <img alt="" className="Post-image" src={this.state.imageUrl} />
            </div>
          }
   
          {postText}

          {
            this.state.userIsOwner && this.state.editMode &&
              <i className="fa fa-check" onClick={this.editPost}></i>
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