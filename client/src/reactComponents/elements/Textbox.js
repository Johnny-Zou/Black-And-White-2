import React, {Component} from 'react';

class Textbox extends Component {
    constructor(props){
        super(props);

        this.inputRef = React.createRef();
        this.setFocus = this.setFocus.bind(this);
    }


    setFocus(){
        this.inputRef.current.focus();
    }

    render(){
        return(
            <div onClick={this.setFocus} className={"textbox " + "textbox--" + this.props.type}>
                <p>{this.props.prompt}</p>
                <input ref={this.inputRef} ></input>
            </div>
        );
    }
}

export default Textbox;