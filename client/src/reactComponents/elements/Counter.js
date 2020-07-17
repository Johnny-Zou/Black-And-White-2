import React, {Component} from 'react';

class Counter extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="counter" onWheel={this.props.scrollWheelFn}>
                <p>{this.props.value}</p>
            </div>
        );
    }
}

export default Counter;
