import React, {Component} from 'react';

class Button extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className={"button " + "button--"+this.props.type} onClick={this.props.clickFn}>
                <p>{this.props.title}</p>
            </div>
        );
    }
}

export default Button;
