import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Post from './Post';
import firebaseConf, {firebase} from './../../../../config/FirebaseConfig';
import moment from 'moment';

class PostDetail extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            textForComment: '',
            commentCount: 0,
            likeCount: 0,
        }
        this.db = firebaseConf.firestore();
        this.postRef;
        this.commentsRef;
        this.addComment = this.addComment.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.commentsListener;
    }

    componentDidMount(){
        const { clusterId, postId, commentCount, likeCount } = this.props.location.state;

        if(this.props.location.state){
            
            this.postRef = this.db.collection("clusters").doc(clusterId).collection('posts').doc(postId);
            this.commentsRef = this.postRef.collection("comments");
            this.commentsRef.orderBy('date', 'desc');
            this.commentsListener = this.commentsRef.onSnapshot((comments)=>{
                            
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
                        commentCount,
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
        
    }

    componentWillUnmount(){
        if(this.commentsListener){
            this.commentsListener();
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

    render() {
        const { userName, userAvatar, userId, text, date, imagePath, clusterId, postId } = this.props.location.state;

        return (
            <div style={{marginTop: '7rem'}}>
                <Post userName={userName} userAvatar={userAvatar} userId={userId} text={text} date={new Date(date)} imagePath={imagePath} 
                    commentCount={this.state.commentCount} likeCount={this.state.likeCount} clusterId={clusterId}
                    postId={postId}
                />
                <ul>
                    {
                        this.state.comments.map((commentData)=>{
                            var date;
                            if(commentData.date && commentData.date.seconds){
                                date = moment(commentData.date.seconds * 1000).format('DD/MM/YYYY - HH:mm');
                            }
                            return(
                                <li key={commentData.id}>{commentData.text} - {date} - {commentData.user.avatar} - {commentData.user.name}</li>
                            )
                        })
                    }
                </ul>
                <form onSubmit={this.addComment}>
                    <textarea rows="5" placeholder="Add a lovely comment" className="textarea" name="textForComment" id="textForComment" value={this.state.textForComment}
                        onChange={this.handleInputChange}></textarea>
                    <br />  
                </form>
                <button className="post-button" onClick={this.addComment}>Send</button>
            </div>
        );
    }
}

export default withRouter(PostDetail);