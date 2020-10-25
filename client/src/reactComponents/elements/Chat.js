import React, {Component} from 'react';

// Redux
import { connect } from 'react-redux';


class Chat extends Component {
    constructor(props){
        super(props);

        this.newMessage = this.newMessage.bind(this);
        this.handleSendMessage = this.handleSendMessage.bind(this);

        this.chatInputRef = React.createRef();
        this.chatContainerRef = React.createRef();

        // state
        this.state = {
            chatLog: [
                {
                    "type": "playerMessage",
                    "sender": "Johnny",
                    "content": "Hi my name is johnnyo sidhaoshdoashdoiash odhasod hasod ihasodihas odihsao diahsdo iahsdoia shdoais hdsoaidh "
                },
                {
                    "type": "playerMessage",
                    "sender": "Johnny",
                    "content": "Hi my name is johnny"
                },
                {
                    "type": "playerMessage",
                    "sender": "Johnny",
                    "content": "Hi my name is johnny"
                },
                {
                    "type": "playerMessage",
                    "sender": "Johnny",
                    "content": "Hi my name is johnny"
                },
                {
                    "type": "playerMessage",
                    "sender": "Johnny",
                    "content": "Hi my name is johnny"
                },
                {
                    "type": "playerMessage",
                    "sender": "Johnny",
                    "content": "Hi my name is johnnyo sidhaoshdoashdoiash odhasod hasod ihasodihas odihsao diahsdo iahsdoia shdoais hdsoaidh "
                },
                {
                    "type": "playerMessage",
                    "sender": "Johnny",
                    "content": "Hi my name is johnnyo sidhaoshdoashdoiash odhasod hasod ihasodihas odihsao diahsdo iahsdoia shdoais hdsoaidh "
                },
                {
                    "type": "playerMessage",
                    "sender": "Johnny",
                    "content": "Hi my name is johnnyo sidhaoshdoashdoiash odhasod hasod ihasodihas odihsao diahsdo iahsdoia shdoais hdsoaidh "
                },
                {
                    "type": "playerMessage",
                    "sender": "Johnny",
                    "content": "Hi my name is johnnyo sidhaoshdoashdoiash odhasod hasod ihasodihas odihsao diahsdo iahsdoia shdoais hdsoaidh "
                },
                {
                    "type": "playerMessage",
                    "sender": "Johnny",
                    "content": "Hi my name is johnnyo sidhaoshdoashdoiash odhasod hasod ihasodihas odihsao diahsdo iahsdoia shdoais hdsoaidh "
                },
                {
                    "type": "playerMessage",
                    "sender": "Johnny",
                    "content": "Hi my name is johnnyo sidhaoshdoashdoiash odhasod hasod ihasodihas odihsao diahsdo iahsdoia shdoais hdsoaidh "
                },
                {
                    "type": "playerMessage",
                    "sender": "Johnny",
                    "content": "Hi my name is johnnyo sidhaasdasdas asd asdasd asd asd asd asd asd asda sd asdas dasd asdas das dasd asdas das dasd asd asd asd asd asd asd oshdoashdoiash odhasod hasod ihasodihas odihsao diahsdo iahsdoia shdoais hdsoaidh "
                },
                {
                    "type": "playerMessage",
                    "sender": "Johnny",
                    "content": "Hi my name is johnnyo sidhaasdasdas asd asdasd asd asd asd asd asd asda sd asdas dasd asdas das dasd asdas das dasd asd asd asd asd asd asd oshdoashdoiash odhasod hasod ihasodihas odihsao diahsdo iahsdoia shdoais hdsoaidh "
                },
                {
                    "type": "playerMessage",
                    "sender": "Johnny",
                    "content": "Hi my name is johnnyo sidhaasdasdas asd asdasd asd asd asd asd asd asda sd asdas dasd asdas das dasd asdas das dasd asd asd asd asd asd asd oshdoashdoiash odhasod hasod ihasodihas odihsao diahsdo iahsdoia shdoais hdsoaidh "
                },
                {
                    "type": "playerMessage",
                    "sender": "Johnny",
                    "content": "Hi my name is johnnyo sidhaasdasdas asd asdasd asd asd asd asd asd asda sd asdas dasd asdas das dasd asdas das dasd asd asd asd asd asd asd oshdoashdoiash odhasod hasod ihasodihas odihsao diahsdo iahsdoia shdoais hdsoaidh "
                },
                {
                    "type": "playerMessage",
                    "sender": "Johnny",
                    "content": "Hi my name is johnnyo sidhaasdasdas asd asdasd asd asd asd asd asd asda sd asdas dasd asdas das dasd asdas das dasd asd asd asd asd asd asd oshdoashdoiash odhasod hasod ihasodihas odihsao diahsdo iahsdoia shdoais hdsoaidh "
                },
                {
                    "type": "playerMessage",
                    "sender": "Johnny",
                    "content": "Hi my name is johnnyo sidhaasdasdas asd asdasd asd asd asd asd asd asda sd asdas dasd asdas das dasd asdas das dasd asd asd asd asd asd asd oshdoashdoiash odhasod hasod ihasodihas odihsao diahsdo iahsdoia shdoais hdsoaidh "
                },
                {
                    "type": "playerMessage",
                    "sender": "Johnny",
                    "content": "Hi my name is johnnyo sidhaasdasdas asd asdasd asd asd asd asd asd asda sd asdas dasd asdas das dasd asdas das dasd asd asd asd asd asd asd oshdoashdoiash odhasod hasod ihasodihas odihsao diahsdo iahsdoia shdoais hdsoaidh "
                },
                {
                    "type": "playerMessage",
                    "sender": "Johnny",
                    "content": "Hi my name is johnnyo sidhaasdasdas asd asdasd asd asd asd asd asd asda sd asdas dasd asdas das dasd asdas das dasd asd asd asd asd asd asd oshdoashdoiash odhasod hasod ihasodihas odihsao diahsdo iahsdoia shdoais hdsoaidh "
                },
                {
                    "type": "playerMessage",
                    "sender": "Johnny",
                    "content": "Hi my name is johnnyo sidhaasdasdas asd asdasd asd asd asd asd asd asda sd asdas dasd asdas das dasd asdas das dasd asd asd asd asd asd asd oshdoashdoiash odhasod hasod ihasodihas odihsao diahsdo iahsdoia shdoais hdsoaidh "
                }
            ]
        };
    }

    newMessage(type,sender,content){
        var newChatLog = this.state.chatLog;
        newChatLog.push({
            "type": type,
            "sender": sender,
            "content": content
        });
        this.setState({chatLog: newChatLog});
        this.chatContainerRef.current.scrollTop = this.chatContainerRef.current.scrollHeight;
    }

    handleSendMessage(e){
        e.preventDefault();
        var message = this.chatInputRef.current.value;
        this.chatInputRef.current.value = "";
        this.props.sendMsgFn(message);
    }

    render(){

        // Create chat list element
        const chatList = [];
        this.state.chatLog.forEach(function(message, i){
            if(message.type === "serverAnnouncement"){
                chatList.push(
                    <li className="msg msg--serverAnnouncement" key={i}>
                        {message.content}
                    </li>
                );
            }
            else if (message.type === "playerMessage") {
                chatList.push(
                    <li className="msg msg--chatMessage" key={i}>
                        <strong>{message.sender}: </strong>{message.content}
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
        name: state.game.name,
        opponent_name: state.game.opponent_name,
        game_id: state.game.game_id,
        max_points: state.game.max_points,
        use_point_val: state.game.use_point_val,
        score: state.game.score,
        opponent_lamps: state.game.opponent_lamps
    });
};

export default connect(mapStateToProps, {})(Chat);

