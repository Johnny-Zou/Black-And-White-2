import React, {Component} from 'react';

import Textbox from "../elements/Textbox.js";
import Button from "../elements/Button.js";

class Join extends Component {
    constructor(props){
        super(props);

        this.enterRoom = this.enterRoom.bind(this);

    }

    enterRoom(){
        this.props.pageChangeFn("Game");
    }

    render(){
        return(
            <div className="page page__join">
                <Textbox prompt="Alias" type="white"/>
                <Textbox prompt="Game Room ID" type="white"/>
                <Button type="white" title="Join Room" clickFn={this.enterRoom}/>
            </div>
        );
    }
}

export default Join;
