import React from 'react';
import PropTypes from 'prop-types';

import '../../style/style.css';
import 'react-chat-elements/dist/main.css';
import { MessageList } from 'react-chat-elements';

const Chat = (props) => (
  <MessageList
  className='message-list'
  lockable={true}
  downButtonBadge={10}
  dataSource={props.messages} />
)
Chat.propTypes = {
    messages: PropTypes.array
}

export default Chat
