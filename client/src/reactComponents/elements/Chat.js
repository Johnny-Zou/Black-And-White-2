import React, {Component} from 'react';

// Redux
import { connect } from 'react-redux';

import { addNewMessage } from '../actions/changeGame.js';

class Chat extends Component {
    constructor(props){
        super(props);

        this.handleSendMessage = this.handleSendMessage.bind(this);

        this.chatInputRef = React.createRef();
        this.chatContainerRef = React.createRef();

    }

    handleSendMessage(e){
        e.preventDefault();
        var message = this.chatInputRef.current.value;
        this.chatInputRef.current.value = "";
        this.props.sendMsgFn(message);
    }

    componentDidUpdate(){
        this.chatContainerRef.current.scrollTop = this.chatContainerRef.current.scrollHeight;
    }

    render(){
        // Create chat list element
        const chatList = [];
        console.log(this.props.chatLog);
        this.props.chatLog.forEach(function(message, i){
            if(message.type === "systemMessage"){
                chatList.push(
                    <li className="msg msg--systemMessage" key={i}>
                        {message.content}
                    </li>
                );
            } else if (message.type === "playerMessage") {
                chatList.push(
                    <li className="msg msg--chatMessage" key={i}>
                        <strong>{message.sender}: </strong>{message.content}
                    </li>
                );
            } else if (message.type === "roundIndicator") {
                chatList.push(
                    <li className="msg msg--roundIndicator" key={i}>
                        <strong>Round {message.content}</strong>
                    </li>
                );
            }            
        });

        return(
            <div className="chat">
                <div ref={this.chatContainerRef} className="chat__msgContainer">
                    <ul className="chat__msgList">
                        {chatList}
                    </ul>
                </div>
                <div className="chat__inputContainer">
                    <form onSubmit={this.handleSendMessage} className="chat__form">
                        <input autoComplete="off" ref={this.chatInputRef} className="chat__input" name="input"></input>
                        <input type="submit" onClick={this.handleSendMessage} className="chat__submit"></input>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return({
        chatLog: state.game.chatLog,
    });
};

export default connect(mapStateToProps, {addNewMessage})(Chat);

