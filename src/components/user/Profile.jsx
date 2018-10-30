import React, { Component, ReactDOM } from 'react'
import { BrowserRouter as Router,Route,Redirect,withRouter, Link } from 'react-router-dom';
import '../style/Home.css';
import '../style/responsive.css';
import './profileComponents/styles/profile.css';
import { Row, Col } from 'reactstrap';
import firebaseConf, {firebase} from './../../config/FirebaseConfig';
import ProfileMenu from './profileComponents/ProfileMenu';
import Post from './profileComponents/post-ui/Post';
import moment from 'moment';
import Dropzone from 'react-dropzone';
import UploadMedia from './profileComponents/chat-ui/UploadMedia';
import EmailVerification from './profileComponents/email-verification/EmailVerification';
import { Login, PostDetail } from './../../Routing';
import ChatWrapper from './profileComponents/chat-ui/ChatWrapper';

class Profile extends Component {

    constructor(props, context) {
        super(props,context);
        this.state = {
            authUser: props.authUser,
            dateOfBirth: '',
            desiredClusters: {},
            name: '',
            lastName:'',
            secondLastName: '',
            numSensatesInCluster: 0,
            sensatesInCluster: [],
            photo: require('./profilepic.png'),
            posts: [],
            showLoadEarlierPosts: true,
            textAreaValue : '',
            showMediaUpload: false,
            imagePath: '',
            files: [],
            clusterId: '',
        };

        this.db = firebaseConf.firestore();
        const settings = { timestampsInSnapshots: true};
        this.db.settings(settings);
        
        this.lastPostDocRef;
        this.postPagingNumber = 25;

        this.sensateListener;
        this.clusterListener;
        this.postsListener;

        this.sensatesQueryArray = [];
        this.sensatesList = [];

        this.handleChange = this.handleChange.bind(this);
        this.prepareClusterPost = this.prepareClusterPost.bind(this);
        this.loadImageToPost = this.loadImageToPost.bind(this);
        
    }

    handleChange(e) {
        this.setState({textAreaValue: e.target.value})
    }
    
    toggleMediaUpload(){
        this.setState((state) => {
            return {showMediaUpload: !state.showMediaUpload};
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
            var clusterRef = clustersRef.child(this.state.clusterId);
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
            "_id": this.state.authUser.uid,
            "name": this.state.name,
            "avatar": this.state.photo
            },
            "id": dateNumber,
            "type": "text",
            "date": serverDate,
            "status": "sent",
        }
        if(imagePath){
            post['image'] = imagePath;
            post['type'] = 'image';
        }
        
        this.db.collection("clusters").doc(this.state.clusterId).collection('posts').add(post).then((res)=>{
            this.setState({
                textAreaValue: '',
                imagePath: '',
                files: [],
            });
        }).catch((err)=>{
            console.log(err);
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.path === this.props.location.pathname && this.props.location.pathname !== prevProps.location.pathname) {
          window.scrollTo(0, 0)
        }
    }

    componentWillUnmount(){
        // Unsubscribe from all listeners to avoid memory leaks
        if(this.sensateListener){
            this.sensateListener();
        }
        if(this.clusterListener){
            this.clusterListener();
        }
        if(this.postsListener){
            this.postsListener();
        }
    }

    componentDidMount(){

        if(this.props.authUser && this.props.authUser.emailVerified){
            this.initListeners();
        }
    }

    initListeners(){
        this.sensateListener = this.db.collection("sensies").doc(this.state.authUser.uid)
        .onSnapshot((doc) =>{
            if(doc.exists){
                const sensate = doc.data();
                
                this.clusterListener = this.db.collection("clusters").where("sensates."+doc.id, "==", true)
                .onSnapshot((querySnapshot) =>{
                    querySnapshot.forEach((doc)=>{
                        const clusterData = doc.data();

                        this.setState({
                            clusterId: doc.id,
                        });

                        let numSensatesInCluster = 0;
                        this.sensatesQueryArray = [];
                        
                        Object.keys(clusterData.sensates).forEach((sensateId)=>{
                            if(clusterData.sensates[sensateId]){
                                numSensatesInCluster = numSensatesInCluster + 1;
                                this.sensatesQueryArray.push(
                                    this.db.collection("sensies").doc(sensateId).get()
                                );
                            }
                        });
                        // Subtract the user's own reference
                        numSensatesInCluster = numSensatesInCluster - 1;
                        this.setState({numSensatesInCluster: numSensatesInCluster});

                        this.sensatesList = [];

                        Promise.all(this.sensatesQueryArray).then((sensatesMembers)=>{
                            sensatesMembers.forEach((sensateMemberData)=>{
                                if(sensateMemberData.exists){
                                    const sensateMemberInfo = sensateMemberData.data();
                                    this.sensatesList.push({
                                        uid: sensateMemberInfo.uid,
                                        name: sensateMemberInfo.name,
                                        lastName: sensateMemberInfo.lastName
                                    });
                                }
                            });
                            this.setState({
                                sensatesInCluster: this.sensatesList
                            });
                        }).catch((err)=>{
                            console.log(err);
                        });

                        //Initialize the Posts Listener
                        this.initPostsListener();

                    });
                });

                this.setState(sensate);
                
            }else{
                console.log("Sensate doesn't exist");
                alert("Sensate doesn't exist or an error ocurred");
            }
        });
    }

    initPostsListener(){
        this.postsListener = this.db.collection("clusters").doc(this.state.clusterId).collection('posts')
            .orderBy("date", "desc").limit(this.postPagingNumber)
            .onSnapshot({
                includeMetadataChanges: true
            },
            (posts)=>{
                var postsHasPendingWrites = posts.metadata.hasPendingWrites;
                if(!postsHasPendingWrites){
                    var postsArray = [];
                    posts.forEach((post,i)=>{
                        var postData = post.data();
                        postData['_id'] = post.id;
                        postData['date'] = moment(postData.date.seconds * 1000);

                        if(this.state.posts.indexOf(postsArray[i])===-1){
                            postsArray.push(postData);
                        }
                    });

                    if(this.state.posts.length > 0){
                        // Only add the last post
                        var newPostsArray = [];
                        newPostsArray.push(postsArray[0]);

                        this.setState({
                            posts: newPostsArray.concat(this.state.posts),
                        });

                    }else{
                        // Add all the posts to the state
                        this.lastPostDocRef = posts.docs[posts.docs.length-1];
                        this.setState({
                            posts: postsArray
                        });
                    }
                }
            });
    }

    loadEarlierPosts(){
        this.setState({
            showLoadEarlierPosts: false,
        });

        this.db.collection("clusters").doc(this.state.clusterId).collection('posts')
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
    
    render() {

        if(this.props.authUser && !this.props.authUser.emailVerified){
            return <EmailVerification authUser={this.props.authUser} />
        }

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

                <Row>
                    {
                        this.state.showMediaUpload && 
                        <UploadMedia showMediaUpload={this.state.showMediaUpload} 
                            toggleMediaUpload={this.toggleMediaUpload.bind(this)} 
                            files={this.state.files} prepareClusterPost={this.prepareClusterPost}
                        />
                    }
                    
                    <div id="outer-container">
                
                        <Col style={this.props.bigScreen ? {opacity: '.99'} : null}>
                            <div className="no-padd">
                                <ProfileMenu photo={this.state.photo} name={this.state.name} 
                                    lastName={this.state.lastName} numSensatesInCluster={this.state.numSensatesInCluster}
                                    sensatesInClusterData={this.state.sensatesInCluster}
                                    menuOpen={this.props.menuOpen} handleStateChange={this.props.handleStateChange} 
                                    bigScreen={this.props.bigScreen}>
                                </ProfileMenu>
                                <p>{this.props.menuOpen}</p>
                            </div>
                        </Col>
                        <Col md={9} id="page-wrap">
                            <Route exact path={this.props.match.path} render={()=>
                                <div>
                                    <div className=" item post-grid-items">
                                        <div className="create-post-card">
                                        <form onSubmit={this.prepareClusterPost}>
                                            <textarea rows="4" placeholder="What is in your mind?!" className="textarea" id="textarea" onChange={this.handleChange} value={this.state.textAreaValue}></textarea>
                                            <br />
                                            <input type='submit' value='Submit' className="post-button" placeholder="post" onClick={this.prepareClusterPost}/>
                                            &nbsp;&nbsp;&nbsp;<input type='button' className="post-button" value="Post with image" onClick={this.loadImageToPost} />
                                        </form>
                                        
                                            
                                        </div>
                                    </div>
                                    <div className="post-grid">
                                    
                                    {
                                        this.state.posts.map((postData)=>{
                                            return(
                                                
                                                <div key={postData._id} className="item post-grid-items">
                                                    <Link to={{ pathname: "/profile/posts/"+postData._id, 
                                                        state: { 
                                                            userName: postData.user.name,
                                                            userAvatar: postData.user.avatar,
                                                            userId: postData.user._id,
                                                            text: postData.text,
                                                            date: postData.date.toString(),
                                                            imagePath: postData.image,
                                                            commentCount: postData.commentCount,
                                                            likeCount: postData.likeCount,
                                                            clusterId: this.state.clusterId,
                                                            postId: postData._id
                                                        } 
                                                    }} >

                                                        <Post userName={postData.user.name} userAvatar={postData.user.avatar} userId={postData.user._id} text={postData.text} date={postData.date} imagePath={postData.image} 
                                                            commentCount={postData.commentCount} likeCount={postData.likeCount} clusterId={this.state.clusterId}
                                                            postId={postData._id}
                                                        />
                                                    </Link>

                                                </div>
                                            )
                                        })
                                    }
                                    </div>
                                    <Row className="text-center m-5">
                                        {
                                            this.state.showLoadEarlierPosts && this.state.posts.length > 0 && 
                                            <button className="post-button" type="button" onClick={this.loadEarlierPosts.bind(this)}>Load earlier posts</button>
                                        }
                                    </Row>
                                </div>
                            } />
                            <Route path={`${this.props.match.path}/posts/:id`} render={()=> !this.state.authUser ? <Login/> : <PostDetail authUser={this.props.authUser} userAvatar={this.state.photo} userName={this.state.name} /> }/>
                        
                        </Col>

                            {
                                this.state.clusterId && 
                                    <ChatWrapper authUser={this.props.authUser} clusterId={this.state.clusterId} userName={this.state.name} userAvatar={this.state.photo} />
                            }

                    </div>
                </Row>
            </div>
        )
    }
}

export default withRouter(Profile);