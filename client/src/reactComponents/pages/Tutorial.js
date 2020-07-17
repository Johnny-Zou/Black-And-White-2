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
                <Button type="white" title="Back" clickFn={this.handlePageChange.bind(this,"Menu")}/>
            </div>
        );
    }
}

export default connect(null, { changePage })(Tutorial);