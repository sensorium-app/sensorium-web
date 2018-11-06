import React, { Component } from 'react';
import { Row } from 'reactstrap';
import firebaseConf, {firebase} from './../../../../config/FirebaseConfig';
import Post from './Post';
import moment from 'moment';
import Dropzone from 'react-dropzone';
import UploadMedia from './../chat-ui/UploadMedia';
import PostDetail from './PostDetail';
import { arrayContainsObject } from './../../misc/Functions';
import update from 'immutability-helper';

class PostsWrapper extends Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            showLoadEarlierPosts: true,
            textAreaValue : '',
            showMediaUpload: false,
            imagePath: '',
            files: [],
            showPostDetail: false,
        }

        this.db = firebaseConf.firestore();
        const settings = { timestampsInSnapshots: true};
        this.db.settings(settings);

        this.dropzoneRef;

        this.lastPostDocRef;
        this.postPagingNumber = 25;
        this.postsListener;

        this.postDetailData = {};

        this.handleChange = this.handleChange.bind(this);
        this.prepareClusterPost = this.prepareClusterPost.bind(this);
        this.loadImageToPost = this.loadImageToPost.bind(this);
        this.toggleMediaUpload = this.toggleMediaUpload.bind(this);
        this.togglePostDetailModal = this.togglePostDetailModal.bind(this);
        this.addClusterPost = this.addClusterPost.bind(this);
        this.loadEarlierPosts = this.loadEarlierPosts.bind(this);
        this.showPostDetail = this.showPostDetail.bind(this);
    }

    componentDidMount(){
        this.initPostsListener();
    }

    componentWillUnmount(){
        // Unsubscribe from all listeners to avoid memory leaks
        if(this.postsListener){
            this.postsListener();
        }
    }
    
    initPostsListener(){
        this.postsListener = this.db.collection("clusters").doc(this.props.clusterId).collection('posts')
            .orderBy("date", "desc").limit(this.postPagingNumber)
            .onSnapshot({
                includeMetadataChanges: true
            },
            (posts)=>{
                posts.docChanges().forEach((change)=> {
                    var postsHasPendingWrites = posts.metadata.hasPendingWrites;
                    if(!postsHasPendingWrites){
                        if (change.type === "added") {
                                var postsArray = [];
                                posts.forEach((post,i)=>{
                                    var postData = post.data();
                                    postData['_id'] = post.id;
                                    postData['date'] = moment(postData.date.seconds * 1000);

                                    postsArray.push(postData);
                                });

                                this.setState({
                                    posts: postsArray,
                                })
                        }
                        if (change.type === "modified") {
                            var postData = change.doc.data();
                            postData['_id'] = change.doc.id;
                            postData['date'] = moment(postData.date.seconds * 1000);
                            var objExists = arrayContainsObject(postData, this.state.posts);
                            if(objExists === null){
                                this.setState({
                                    posts: [postData, ...this.state.posts ],
                                });
                            }else{
                                this.setState({
                                    posts: update(this.state.posts, {[objExists]:  {$set: postData} })
                                });
                            }
                        }
                        if (change.type === "removed") {
                            var postData = change.doc.data();
                            postData['_id'] = change.doc.id;
                            postData['date'] = moment(postData.date.seconds * 1000);
                            var objExists = arrayContainsObject(postData, this.state.posts);
                            if(objExists !== null){
                                this.setState({
                                    posts: this.state.posts.filter((_, i) => i !== objExists)
                                });
                            }

                        }
                    }
                });
            });
    }

    handleChange(e) {
        this.setState({textAreaValue: e.target.value})
    }
    
    toggleMediaUpload(){
        this.setState((state) => {
            return {showMediaUpload: !state.showMediaUpload};
        });
    }

    togglePostDetailModal(){
        this.setState((state) => {
            return {showPostDetail: !state.showPostDetail};
        });
    }

    prepareClusterPost(e) {
        if(e && (typeof e !== 'string')){
            e.preventDefault();
        }
        
        if(this.state.files && this.state.files.length>0){
            var storage = firebase.storage();
            var storageRef = storage.ref();
            var clustersRef = storageRef.child('clusters');
            var clusterRef = clustersRef.child(this.props.clusterId);
            var imageRef = clusterRef.child(new Date().getTime() + this.state.files[0].name);

            imageRef.put(this.state.files[0]).then((snapshot)=> {
                var imagePath = snapshot.ref.location.path;
                this.addClusterPost(e, imagePath);
            }).catch((err)=>{
                console.log(err);
            });
        }else{
            if(this.state.textAreaValue === ''){
                alert('Please type a message before posting');
            }else{
                this.addClusterPost(this.state.textAreaValue);
            }
        }
    }

    addClusterPost(text, imagePath){
        const serverDate = firebase.firestore.FieldValue.serverTimestamp();
        const date = new Date();
        const dateNumber = date.getTime();
        const post = {
            "text": text,
            "user": {
                "_id": this.props.authUser.uid,
                "name": this.props.userName,
                "avatar": this.props.userAvatar
            },
            "id": dateNumber,
            "type": "text",
            "date": serverDate,
            "status": "sent",
            "commentCount": 0,
            "likeCount": 0,
        }
        if(imagePath){
            post['image'] = imagePath;
            post['type'] = 'image';
        }
        
        this.db.collection("clusters").doc(this.props.clusterId).collection('posts').add(post).then((res)=>{
            this.setState({
                textAreaValue: '',
                imagePath: '',
                files: [],
            });
        }).catch((err)=>{
            console.log(err);
        });
    }

    loadEarlierPosts(){
        this.setState({
            showLoadEarlierPosts: false,
        });

        this.db.collection("clusters").doc(this.props.clusterId).collection('posts')
        .orderBy("date", "desc")
        .startAfter(this.lastPostDocRef)
        .limit(this.postPagingNumber).get().then((earlierPosts)=>{
            var posts = [];

            this.lastPostDocRef = earlierPosts.docs[earlierPosts.docs.length-1];

            earlierPosts.forEach((post)=> {
                var id = post.id;
                var postData = post.data();

                postData['date'] = moment(postData.date.seconds * 1000);
                postData['_id'] = id;

                posts.push(postData);     
            });

            var olderPostsMerged = this.state.posts.concat(posts);
            this.setState({
                posts: olderPostsMerged,
                showLoadEarlierPosts: true,
            });
        }).catch((err)=>{
            console.log(err); 
            alert('Error getting earlier posts');
        });
    }

    loadImageToPost(){
        this.dropzoneRef.open();
    }

    showPostDetail(dataObj){
        this.postDetailData = {
            userName: dataObj.userName,
            userAvatar: dataObj.userAvatar,
            userId: dataObj.userId,
            text: dataObj.text,
            date: dataObj.date,
            imagePath: dataObj.imagePath,
            commentCount: dataObj.commentCount,
            likeCount: dataObj.likeCount,
            clusterId: dataObj.clusterId,
            postId: dataObj.postId,
        };

        this.togglePostDetailModal();
        
    }

    render() {
        return (
            <div>
                <Dropzone
                    accept="image/*"
                    style={{'display': 'none'}} ref={(node) => { this.dropzoneRef = node; }} 
                    onDrop={(accepted, rejected) => {
                        if(rejected.length>0){
                            alert('Unsupported file');
                            return;
                        }
                        if(accepted.length>0){
                            console.log(accepted)
                            this.setState({
                                files: accepted
                            },()=>{
                                this.toggleMediaUpload();
                            });
                        }
                    }}
                >
                </Dropzone>

                {
                    this.state.showMediaUpload && 
                    <UploadMedia showMediaUpload={this.state.showMediaUpload} 
                        toggleMediaUpload={this.toggleMediaUpload} 
                        files={this.state.files} prepareClusterPost={this.prepareClusterPost}
                    />
                }

                {
                    this.state.showPostDetail && 
                    <PostDetail togglePostDetailModal={this.togglePostDetailModal} showPostDetail={this.state.showPostDetail} 
                        userName={this.postDetailData.userName} userAvatar={this.postDetailData.userAvatar} userId={this.postDetailData.userId} 
                        text={this.postDetailData.text} date={this.postDetailData.date} imagePath={this.postDetailData.imagePath} 
                        clusterId={this.postDetailData.clusterId} postId={this.postDetailData.postId} authUser={this.props.authUser}
                        commentCount={this.postDetailData.commentCount} likeCount={this.postDetailData.likeCount}
                    />
                }

                <div className=" item post-grid-items">
                    <div className="create-post-card">
                        <form onSubmit={this.prepareClusterPost}>
                            <textarea rows="4" placeholder="What is in your mind?!" className="textarea" id="textarea" onChange={this.handleChange} value={this.state.textAreaValue}></textarea>
                            <br />
                            <input type='submit' value='Submit' className="post-button" placeholder="post" onClick={this.prepareClusterPost}/>
                            &nbsp;&nbsp;&nbsp;<button type='button' title="Add Images" className="post-add-button" value="Post with image" onClick={this.loadImageToPost} > <i className="fa fa-plus-square-o"></i></button>
                        </form>
                    </div>
                </div>
                <div className="post-grid">
                
                {
                    this.state.posts.map((postData)=>{
                        return(
                            
                            <div key={postData._id} className="item post-grid-items" onClick={()=>this.showPostDetail({ 
                                userName: postData.user.name,
                                userAvatar: postData.user.avatar,
                                userId: postData.user._id,
                                text: postData.text,
                                date: postData.date.toString(),
                                imagePath: postData.image,
                                commentCount: postData.commentCount,
                                likeCount: postData.likeCount,
                                clusterId: this.props.clusterId,
                                postId: postData._id
                            })}>

                                <Post userName={postData.user.name} userAvatar={postData.user.avatar} userId={postData.user._id} text={postData.text} date={postData.date} imagePath={postData.image} 
                                    commentCount={postData.commentCount} likeCount={postData.likeCount} clusterId={this.props.clusterId}
                                    postId={postData._id} authUser={this.props.authUser}
                                />
                                
                            </div>
                        )
                    })
                }
                </div>
                <Row className="text-center m-5">
                    {
                        this.state.showLoadEarlierPosts && this.state.posts.length > 0 && 
                        <button className="post-button" type="button" onClick={this.loadEarlierPosts}>Load earlier posts</button>
                    }
                </Row>
            </div>
        );
    }
}

export default PostsWrapper;