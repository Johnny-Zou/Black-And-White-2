import React, {Component} from 'react';

class Lamp extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="lamp">
                <div className="lamp_overlay"></div>
                <div className="lamp__element"></div>
                <div className="lamp__element"></div>
                <div className="lamp__element"></div>
                <div className="lamp__element"></div>
                <div className="lamp__element"></div>
            </div>
        );
    }
}

export default Lamp;
