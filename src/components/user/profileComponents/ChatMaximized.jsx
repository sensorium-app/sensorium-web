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
	TextComposer,
	Row,
	IconButton,
	SendButton,
    CloseIcon,
	Column,
} from '@livechat/ui-kit';

class Maximized extends React.Component {
    constructor(props){
        super(props);
    }

    sendMessageToChat(event){
        console.log(event)
        var text = event;
        if(text && /\S/.test(text)){
            this.props.sendMessageToChat(text);
        }
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
                            this.props.messages.map(message => (
                                <MessageGroup
                                    avatar={ !message.isOwn ? message.avatar : null}
                                    onlyFirstWithMeta
                                    key={message.id}
                                >
                                
                                    <Message date={message.dateString + ''} authorName={message.user.name}
                                        isOwn={message.isOwn}
                                    >
                                        <MessageText>{message.text}</MessageText>
                                    </Message>

                                </MessageGroup>
                            ))
                        }
                        </MessageList>
                    </div>

                
                <TextComposer defaultValue="" onSend={this.sendMessageToChat.bind(this)}>
                    <Row align="center">
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