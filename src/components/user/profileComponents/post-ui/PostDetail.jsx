import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Post from './Post';
import firebaseConf, {firebase} from './../../../../config/FirebaseConfig';
import moment from 'moment';
import './style/comment.css';
class PostDetail extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            textForComment: '',
            commentCount: 0,
            likes: [],
            likeCount: 0,
        }
        this.db = firebaseConf.firestore();
        this.postRef;
        this.likesRef;
        this.commentsRef;
        this.addComment = this.addComment.bind(this);
        this.addLike = this.addLike.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.commentsListener;
        this.likesListener;
    }

    componentDidMount(){
        const { clusterId, postId } = this.props.location.state;

        if(this.props.location.state){
            ///clusters/4BwroUCr3uGqYn7p6nLc/posts/mtH9savjt1BrfkkCHm4H/comments/Xa27mLZ1geNSgK9XvSvP
            this.postRef = this.db.collection("clusters").doc(clusterId).collection('posts').doc(postId);
            this.likesRef = this.postRef.collection("likes");
            this.commentsRef = this.postRef.collection("comments");
            
            this.initComments();
            this.initLikes();
        }
        
    }

    componentWillUnmount(){
        if(this.commentsListener){
            this.commentsListener();
        }
    }

    initComments(){
        this.commentsListener = this.commentsRef.orderBy('date').onSnapshot((comments)=>{
            var commentsArray = [];
            comments.forEach(element => {
                var elem = element.data();
                elem['id'] = element.id;
                commentsArray.push(elem);
            });
            

            if(this.state.commentCount === 0){
                //add all of the comments, onInit
                this.setState({
                    comments: commentsArray,
                    commentCount: this.props.location.state.commentCount,
                });
            }else{
                var newCommentsArray = [];
                for(var i=0;i<=commentsArray.length-1; i++){

                    if(this.state.comments.indexOf(commentsArray[i])===-1){
                        newCommentsArray.push(commentsArray[i]);
                    }
                }

                this.setState({
                    comments: newCommentsArray,
                    commentCount: this.state.commentCount + 1,
                });
            }
        });
    }

    initLikes(){
        this.likesListener = this.likesRef.orderBy('date').onSnapshot((likes)=>{
            var likesArray = [];
            var likeCount = 0;
            likes.forEach(element => {
                var elem = element.data();
                elem['id'] = element.id;
                likesArray.push(elem);
                likeCount ++;
            });
            

            if(this.state.likeCount === 0){
                //add all of the comments, onInit
                this.setState({
                    likes: likesArray,
                    likeCount: likeCount,
                });
            }else{
                var newLikesArray = [];
                for(var i=0;i<=likesArray.length-1; i++){

                    if(this.state.likes.indexOf(likesArray[i])===-1){
                        newLikesArray.push(likesArray[i]);
                    }
                }

                this.setState({
                    likes: newLikesArray,
                    likeCount: likeCount,
                });
            }
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    addComment(){

        const commentDoc = {
            text: this.state.textForComment,
            type: 'text',
            date: firebase.firestore.FieldValue.serverTimestamp(),
            user: {
                _id: this.props.authUser.uid,
                avatar: this.props.userAvatar,
                name: this.props.userName,
            },
        };

        this.db.runTransaction((transaction)=>{
            return transaction.get(this.postRef).then((postDoc)=> {
                if (!postDoc.exists) {
                    throw "Document does not exist!";
                }
                var newCommentCount = postDoc.data().commentCount + 1;
                transaction.update(this.postRef, {commentCount: newCommentCount});
                transaction.set(this.commentsRef.doc(),commentDoc);
                return newCommentCount;
            }).then((newCommentCount)=>{
                this.setState({
                    textForComment: '',
                })
            }).catch((error)=> {
                console.log("Transaction failed: ", error);
            });
        });
    }

    addLike(){
        const likeDoc = {
            date: firebase.firestore.FieldValue.serverTimestamp(),
            user: {
                _id: this.props.authUser.uid,
                avatar: this.props.userAvatar,
                name: this.props.userName,
            },
        };

        if(this.state.likes.length > 0){
            var shouldAllowLike = true;
            this.state.likes.forEach((like)=>{
                console.log(like);
    
                if(like.user._id === this.props.authUser.uid){
                    console.log('dELETE LIKE')
                    shouldAllowLike = false;
                }/*else{
                    console.log('do')
                    this.addLikeToDb(likeDoc);
                }*/
            });
            if(shouldAllowLike){
                this.addLikeToDb(likeDoc);
            }
        }else{
            this.addLikeToDb(likeDoc);
        }
        

        /**/
    }

    addLikeToDb(likeDoc){
        this.db.runTransaction((transaction)=>{
            return transaction.get(this.postRef).then((postDoc)=> {
                if (!postDoc.exists) {
                    throw "Document does not exist!";
                }
                var newLikeCount = postDoc.data().likeCount + 1;
                transaction.update(this.postRef, {likeCount: newLikeCount});
                transaction.set(this.likesRef.doc(),likeDoc);
            }).then(()=>{
                console.log('like added');
            }).catch((error)=> {
                console.log("Transaction failed: ", error);
            });
        });
    }

    render() {
        const { userName, userAvatar, userId, text, date, imagePath, clusterId, postId } = this.props.location.state;

        return (
            <div style={{marginTop: '7rem'}} className="PostPage">
                
                <Post userName={userName} userAvatar={userAvatar} userId={userId} text={text} date={new Date(date)} imagePath={imagePath} 
                    commentCount={this.state.commentCount} likeCount={this.state.likeCount} clusterId={clusterId}
                    postId={postId}
                />
                <button className="post-button" onClick={this.addLike}>Love/LikeButton</button>

                <ul className="comment-container">
                    {
                        this.state.comments.map((commentData)=>{
                            var date;
                            if(commentData.date && commentData.date.seconds){
                                date = moment(commentData.date.seconds * 1000).format('DD/MM/YYYY - HH:mm');
                            }
                            return(
                                <li key={commentData.id} className="comment" >

                                <div className="comment-author">
                                    <img className="comment-author-avatar" src={commentData.user.avatar}/>
                                    
                                </div>

                                <div className="comment-data">

                                    <p className="comment-author-details">
                                             {commentData.user.name}<br/>
                                             <span className="comment-time-stamp" >{date}</span>
                                    </p>
                                
                                     {commentData.text}
                                    
                                </div>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className="comment-input-container">
                    <form onSubmit={this.addComment}>
                        <textarea rows="2" placeholder="Add a lovely comment" className="comment-input" name="textForComment" id="textForComment" value={this.state.textForComment}
                            onChange={this.handleInputChange}></textarea>
                          
                    </form>
                    <button className="send-comment" onClick={this.addComment}><i className="fa fa-angle-double-right"></i></button>
                </div>
            </div>
        );
    }
}

export default withRouter(PostDetail);