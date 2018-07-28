import React from 'react';
import PropTypes from 'prop-types';

import '../../style/style.css';
import { ChatFeed, Message } from 'react-chat-ui'

const Chat = (props) => (
    <ChatFeed
    messages={props.messages} 
    isTyping={props.is_typing} 
    hasInputField={false} // Boolean: use our input, or use your own
    showSenderName // show the name of the user who sent the message
    bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
    // JSON: Custom bubble styles
    bubbleStyles={
      {
        text: {
          fontSize: 30
        },
        chatbubble: {
          borderRadius: 70,
          padding: 40
        }
      }
    }
  />
  
)
Chat.propTypes = {
    messages: PropTypes.boolean,
    is_typing: PropTypes.boolean,
}

export default Chat
