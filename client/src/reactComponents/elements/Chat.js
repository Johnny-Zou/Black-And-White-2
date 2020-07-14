import React, {Component} from 'react';

class Chat extends Component {
    constructor(props){
        super(props);
        // state
        this.state = {
            chatLog: [
                {
                    "type": "playerMessage",
                    "from": "Johnny",
                    "content": "Hi my name is johnnyo sidhaoshdoashdoiash odhasod hasod ihasodihas odihsao diahsdo iahsdoia shdoais hdsoaidh "
                },
                {
                    "type": "playerMessage",
                    "from": "Johnny",
                    "content": "Hi my name is johnny"
                },
                {
                    "type": "playerMessage",
                    "from": "Johnny",
                    "content": "Hi my name is johnny"
                },
                {
                    "type": "playerMessage",
                    "from": "Johnny",
                    "content": "Hi my name is johnny"
                },
                {
                    "type": "playerMessage",
                    "from": "Johnny",
                    "content": "Hi my name is johnny"
                },
                {
                    "type": "playerMessage",
                    "from": "Johnny",
                    "content": "Hi my name is johnnyo sidhaoshdoashdoiash odhasod hasod ihasodihas odihsao diahsdo iahsdoia shdoais hdsoaidh "
                },
                {
                    "type": "playerMessage",
                    "from": "Johnny",
                    "content": "Hi my name is johnnyo sidhaoshdoashdoiash odhasod hasod ihasodihas odihsao diahsdo iahsdoia shdoais hdsoaidh "
                },
                {
                    "type": "playerMessage",
                    "from": "Johnny",
                    "content": "Hi my name is johnnyo sidhaoshdoashdoiash odhasod hasod ihasodihas odihsao diahsdo iahsdoia shdoais hdsoaidh "
                },
                {
                    "type": "playerMessage",
                    "from": "Johnny",
                    "content": "Hi my name is johnnyo sidhaoshdoashdoiash odhasod hasod ihasodihas odihsao diahsdo iahsdoia shdoais hdsoaidh "
                },
                {
                    "type": "playerMessage",
                    "from": "Johnny",
                    "content": "Hi my name is johnnyo sidhaoshdoashdoiash odhasod hasod ihasodihas odihsao diahsdo iahsdoia shdoais hdsoaidh "
                },
                {
                    "type": "playerMessage",
                    "from": "Johnny",
                    "content": "Hi my name is johnnyo sidhaoshdoashdoiash odhasod hasod ihasodihas odihsao diahsdo iahsdoia shdoais hdsoaidh "
                },
                {
                    "type": "playerMessage",
                    "from": "Johnny",
                    "content": "Hi my name is johnnyo sidhaasdasdas asd asdasd asd asd asd asd asd asda sd asdas dasd asdas das dasd asdas das dasd asd asd asd asd asd asd oshdoashdoiash odhasod hasod ihasodihas odihsao diahsdo iahsdoia shdoais hdsoaidh "
                },
                {
                    "type": "playerMessage",
                    "from": "Johnny",
                    "content": "Hi my name is johnnyo sidhaasdasdas asd asdasd asd asd asd asd asd asda sd asdas dasd asdas das dasd asdas das dasd asd asd asd asd asd asd oshdoashdoiash odhasod hasod ihasodihas odihsao diahsdo iahsdoia shdoais hdsoaidh "
                },
                {
                    "type": "playerMessage",
                    "from": "Johnny",
                    "content": "Hi my name is johnnyo sidhaasdasdas asd asdasd asd asd asd asd asd asda sd asdas dasd asdas das dasd asdas das dasd asd asd asd asd asd asd oshdoashdoiash odhasod hasod ihasodihas odihsao diahsdo iahsdoia shdoais hdsoaidh "
                },
                {
                    "type": "playerMessage",
                    "from": "Johnny",
                    "content": "Hi my name is johnnyo sidhaasdasdas asd asdasd asd asd asd asd asd asda sd asdas dasd asdas das dasd asdas das dasd asd asd asd asd asd asd oshdoashdoiash odhasod hasod ihasodihas odihsao diahsdo iahsdoia shdoais hdsoaidh "
                },
                {
                    "type": "playerMessage",
                    "from": "Johnny",
                    "content": "Hi my name is johnnyo sidhaasdasdas asd asdasd asd asd asd asd asd asda sd asdas dasd asdas das dasd asdas das dasd asd asd asd asd asd asd oshdoashdoiash odhasod hasod ihasodihas odihsao diahsdo iahsdoia shdoais hdsoaidh "
                },
                {
                    "type": "playerMessage",
                    "from": "Johnny",
                    "content": "Hi my name is johnnyo sidhaasdasdas asd asdasd asd asd asd asd asd asda sd asdas dasd asdas das dasd asdas das dasd asd asd asd asd asd asd oshdoashdoiash odhasod hasod ihasodihas odihsao diahsdo iahsdoia shdoais hdsoaidh "
                },
                {
                    "type": "playerMessage",
                    "from": "Johnny",
                    "content": "Hi my name is johnnyo sidhaasdasdas asd asdasd asd asd asd asd asd asda sd asdas dasd asdas das dasd asdas das dasd asd asd asd asd asd asd oshdoashdoiash odhasod hasod ihasodihas odihsao diahsdo iahsdoia shdoais hdsoaidh "
                },
                {
                    "type": "playerMessage",
                    "from": "Johnny",
                    "content": "Hi my name is johnnyo sidhaasdasdas asd asdasd asd asd asd asd asd asda sd asdas dasd asdas das dasd asdas das dasd asd asd asd asd asd asd oshdoashdoiash odhasod hasod ihasodihas odihsao diahsdo iahsdoia shdoais hdsoaidh "
                },
                {
                    "type": "playerMessage",
                    "from": "Johnny",
                    "content": "Hi my name is johnnyo sidhaasdasdas asd asdasd asd asd asd asd asd asda sd asdas dasd asdas das dasd asdas das dasd asd asd asd asd asd asd oshdoashdoiash odhasod hasod ihasodihas odihsao diahsdo iahsdoia shdoais hdsoaidh "
                }
            ]
        };
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
                        <strong>{message.from}: </strong>{message.content}
                    </li>
                );
            }
            
        });

        return(
            <div className="chat">
                <div className="chat__msgContainer">
                    <ul className="chat__msgList">
                        {chatList}
                    </ul>
                </div>
                <div className="chat__inputContainer">
                    <input className="chat__input" name="input"></input>
                    <button className="chat__submit"></button>
                </div>
            </div>
        );
    }
}

export default Chat;
