import React from 'react';
import PropTypes from 'prop-types';

import '../../style/style.css';
import 'react-chat-elements/dist/main.css';
import { MessageList } from 'react-chat-elements';

const Chat = (props) => (
  <div className="right-panel">
    <MessageList
    className='message-list'
    lockable={false}
    downButtonBadge={10}
    toBottomHeight={'100%'}
    dataSource={props.messages} />
  </div>
)
Chat.propTypes = {
    messages: PropTypes.array
}

export default Chat
