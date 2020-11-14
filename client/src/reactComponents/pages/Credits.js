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
                <div className="page_content_scrollWrapper">
                    <div className="page__FadeInOut"></div>
                    <div className="page__content">
                        <p>This is a two player death match game that orginated from season 3 of <i>The Genius</i>. I do not take any credit for the creation of this game. This app was made using NodeJS, ExpressJS and socketIO to communicate between the client and the server. The front-end is created in React with redux for state managment.</p>
                        <br></br>
                        <br></br>
                        <p>Source code for this project can be found <a href="https://github.com/Johnny-Zou/Black-And-White-2">here</a></p>
                        <p>Developer: Johnny Zou</p>
                    </div>
                </div>
                <Button type="white" title="Back" clickFn={this.handlePageChange.bind(this,"Menu")}/>
            </div>
        );
    }
}

export default connect(null, { changePage })(Credits);