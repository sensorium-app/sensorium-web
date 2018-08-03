import React from 'react';
import PropTypes from 'prop-types';

import '../../style/style.css';
import './styles/chat.css';
import 'react-chat-elements/dist/main.css';
import { MessageList } from 'react-chat-elements';

const Chat = (props) => (
  <div>
    <MessageList
    className='scrollable'
    lockable={true}
    dataSource={props.messages} />
  </div>
)
Chat.propTypes = {
    messages: PropTypes.array
}

export default Chat
