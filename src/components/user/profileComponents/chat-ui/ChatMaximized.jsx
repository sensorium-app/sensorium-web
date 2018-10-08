import React from 'react';
import PropTypes from 'prop-types';
import {
	Avatar,
	TitleBar,
	TextInput,
	MessageList,
	Message,
	MessageText,
	AgentBar,
	Title,
	Subtitle,
    MessageGroup,
    MessageTitle,
    Bubble,
	TextComposer,
    Row,
    AddIcon,
	IconButton,
	SendButton,
    CloseIcon,
	Column,
} from '@livechat/ui-kit';
import MediaMessage from './MediaMessage';
import Dropzone from 'react-dropzone';
import UploadMedia from './UploadMedia';

class Maximized extends React.Component {
    constructor(props){
        super(props);
        this.state={
            files:[],
            dropzoneActive: false,
            showMediaUpload: false,
        }

        this.dropzoneRef;
    }

    sendMessageToChat(event){
        console.log(event, this.state.files)
        if(this.state.files.length>0){
            this.props.sendMessageToChat(event, this.state.files);
            this.setState({
                files: [],
            })
        }else{
            var text = event;
            if(text && /\S/.test(text)){
                this.props.sendMessageToChat(text);
            }
        }
    }

    loadImageToSend(){
        this.dropzoneRef.open();
    }

    toggleMediaUpload(){
        this.setState((state) => {
            return {showMediaUpload: !state.showMediaUpload};
        });
    }

    render(){
        return (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        paddingTop: '8vh',
                    }}
                >
                    {
                        this.state.showMediaUpload && 
                        <UploadMedia showMediaUpload={this.state.showMediaUpload} 
                            toggleMediaUpload={this.toggleMediaUpload.bind(this)} 
                            files={this.state.files} sendMessageToChat={this.sendMessageToChat.bind(this)}
                        />
                    }
                    
                    <div>
                        <Dropzone style={{'display': 'none'}} ref={(node) => { this.dropzoneRef = node; }} 
                            onDrop={(accepted, rejected) => {
                                console.log(accepted, rejected)
                                if(rejected.length>0){
                                    alert('Unsupported file');
                                    return;
                                }
                                if(accepted.length>0){
                                    console.log(accepted)
                                    this.setState({
                                        files: accepted
                                    },()=>{
                                        //this.sendMessageToChat();
                                        this.toggleMediaUpload();
                                    });
                                }
                            }}>
                        </Dropzone>
                    </div>
                    <TitleBar
                        rightIcons={[
                            <IconButton key="close">
                                <CloseIcon />
                            </IconButton>,
                        ]}
                        title="Welcome to the Sensorium chat"
                        onClick={this.props.minimize}
                    />
                    <AgentBar>
                        <Avatar imgUrl="https://livechat.s3.amazonaws.com/default/avatars/male_8.jpg" />
                        <Column>
                            <Title>{'Cluster Name'}</Title>
                            <Subtitle>{'"Cluster Motto"'}</Subtitle>
                        </Column>
                    </AgentBar>
                    <div
                        style={{
                            flexGrow: 1,
                            minHeight: 0,
                            height: '100%',
                        }}
                    >
                        
                            <MessageList active>
                            {
                                this.props.showLoadEarlierMessages &&
                                <button className="btn btn-grad-peach wow bounceIn registerBtn" type="button" onClick={this.props.loadEarlierMessages.bind(this)}>Load earlier messages</button>
                            }
                            {
                                this.props.messages.map(message => (
                                    <MessageGroup
                                        avatar={ !message.isOwn ? message.avatar : null}
                                        onlyFirstWithMeta
                                        key={message.id}
                                    >
                                        <Message date={message.dateString + ''} authorName={message.user.name}
                                                isOwn={message.isOwn}
                                            >
                                            {
                                                message.imagePath &&
                                                <Bubble isOwn={message.isOwn}>
                                                    <MessageTitle title={message.text} />
                                                    <MediaMessage imagePath={message.imagePath} />
                                                </Bubble>
                                            }
                                            {
                                                message.text && !message.imagePath &&
                                                    <MessageText>{message.text}</MessageText>
                                            }
                                        </Message>
                                    </MessageGroup>
                                ))
                            }
                            </MessageList>
                        </div>

                    
                    <TextComposer defaultValue="" onSend={this.sendMessageToChat.bind(this)}>
                        <Row align="center">
                            <IconButton fit onClick={this.loadImageToSend.bind(this)}>
                                <AddIcon />
                            </IconButton>
                            <TextInput fill="true" />
                            <SendButton fit/>
                        </Row>
                    </TextComposer>
                    <div
                        style={{
                            textAlign: 'center',
                            fontSize: '.6em',
                            padding: '.4em',
                            background: '#fff',
                            color: '#888',
                        }}
                    >
                        {'Powered by Love from Sensies around the world'}
                    </div>
                </div>
        )
    }
}

Maximized.propTypes = {
    sendMessageToChat: PropTypes.func,
    chatText: PropTypes.element
}

export default Maximized