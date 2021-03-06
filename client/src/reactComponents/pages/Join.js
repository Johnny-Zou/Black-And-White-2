import React, {Component} from 'react';

import Textbox from "../elements/Textbox.js";
import Button from "../elements/Button.js";

// Redux
import { connect } from 'react-redux';

// Actions
import { changePage } from '../actions/changePage.js';
import { changeName, changeGameID } from '../actions/changeGame.js';

class Join extends Component {
    constructor(props){
        super(props);

        this.aliasRef = React.createRef();
        this.gameIDRef = React.createRef();
        this.joinGame = this.joinGame.bind(this);
    }

    handlePageChange(newPage){
        this.props.changePage(newPage);
    }

    joinGame(){
        var name = this.aliasRef.current.inputRef.current.value;
        var game_id = this.gameIDRef.current.inputRef.current.value;
        
        this.props.changeName(name);
        this.props.changeGameID(game_id);
        this.props.changePage("Game");
    }

    componentDidMount(){
        this.gameIDRef.current.inputRef.current.value = window.location.pathname.substring(7);
    }

    render(){
        return(
            <div className="page page__join">
                <Textbox ref={this.aliasRef} prompt="Alias" type="white"/>
                <Textbox ref={this.gameIDRef} prompt="Game Room ID" type="white"/>
                <div className="inline_buttonContainer">
                    <Button type="white" title="Back" clickFn={this.handlePageChange.bind(this,"Menu")}/>
                    <Button type="white" title="Join Room" clickFn={this.joinGame}/>
                </div>
            </div>
        );
    }
}

export default connect(null, { changePage, changeName, changeGameID })(Join);