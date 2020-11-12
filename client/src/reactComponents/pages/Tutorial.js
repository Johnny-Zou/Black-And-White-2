import React, {Component} from 'react';
import Button from "../elements/Button.js";

// Redux
import { connect } from 'react-redux';

// Actions
import { changePage } from '../actions/changePage.js';

class Tutorial extends Component {
    constructor(props){
        super(props);
    }

    handlePageChange(newPage){
        this.props.changePage(newPage);
    }

    render(){
        return(
            <div className="page page__tutorial">
                <div className="page_content_scrollWrapper">
                    <div className="page__title">How to Play</div>
                    <div className="page__content">

                    </div>
                </div>
                <Button type="white" title="Back" clickFn={this.handlePageChange.bind(this,"Menu")}/>
            </div>
        );
    }
}

export default connect(null, { changePage })(Tutorial);