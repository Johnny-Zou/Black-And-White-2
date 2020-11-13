import React, {Component} from 'react';
import Button from "../elements/Button.js";

// Redux
import { connect } from 'react-redux';

// Actions
import { changePage } from '../actions/changePage.js';

class Credits extends Component {
    constructor(props){
        super(props);
    }

    handlePageChange(newPage){
        this.props.changePage(newPage);
    }


    render(){
        return(
            <div className="page page__credits">
                <p>This is a two player death match game that orginated from season 3 of <i>The Genius</i>. I do not take any credit for the creation of this game. This app was made using winSock to communicate between two computers (server and client) and requires 2 windows computers to play.</p>

                <Button type="white" title="Back" clickFn={this.handlePageChange.bind(this,"Menu")}/>
            </div>
        );
    }
}

export default connect(null, { changePage })(Credits);