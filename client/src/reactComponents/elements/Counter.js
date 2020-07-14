import React, {Component} from 'react';

class Counter extends Component {
    constructor(props){
        super(props);
        // state
        this.state = {
        };
    }

    render(){
        return(
            <div className="counter">
                <p>{this.props.value}</p>
            </div>
        );
    }
}

export default Counter;
