import React, {Component} from 'react';
import Button from '../elements/Button.js'

// Redux
import { connect } from 'react-redux';

// Actions
import { changePage } from '../actions/changePage.js';

class Menu extends Component {
    constructor(props){
        super(props);
    }

    handlePageChange(newPage){
        this.props.changePage(newPage);
    }

    render(){
        return(
            <div className="page page__menu">
                <Button type="white" title="Join" clickFn={this.handlePageChange.bind(this,"Join")}/>
                <Button type="white" title="Tutorial" clickFn={this.handlePageChange.bind(this,"Tutorial")}/>
                <Button type="white" title="Credits" clickFn={this.handlePageChange.bind(this,"Credits")}/>
            </div>
        );
    }
}

export default connect(null, { changePage })(Menu);
