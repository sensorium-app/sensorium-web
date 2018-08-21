import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../../style/style.css';
import './styles/profile.css';
import './styles/chat.css';
import '../../style/responsive.css';
import 'react-chat-elements/dist/main.css';
import { Input } from 'react-chat-elements';

class ChatInput extends Component {
    constructor(props){
        super(props);
    }

    sendMessageToChat(event){
        var text = this.chatText.state.value;
        if(text && /\S/.test(text)){
            this.props.sendMessageToChat(text);
            this.chatText.clear();
        }
    }

    render(){
        return (
            <div className='input'>
                <Input
                    placeholder="Type your message"
                    defaultValue=""
                    className="chat-input"
                    ref={(input) => { this.chatText = input; }} 
                    multiline={true}
                    // buttonsFloat='left'
                    onKeyPress={(e) => {
                        if (e.shiftKey && e.charCode === 13) {
                            return true;
                        }
                        if (e.charCode === 13) {
                            if(this.chatText.state.value && /\S/.test(this.chatText.state.value)){
                                this.sendMessageToChat();
                            }
                            
                            e.preventDefault();
                            return false;
                        }
                    }}
                    rightButtons={
                        <button
                            className="send-button"
                            
                            onClick={this.sendMessageToChat.bind(this)}><span className="lnr lnr-rocket"></span> </button>
                    } />
            </div>
        )
    }
}

ChatInput.propTypes = {
    sendMessageToChat: PropTypes.func,
    chatText: PropTypes.element
}

export default ChatInput
