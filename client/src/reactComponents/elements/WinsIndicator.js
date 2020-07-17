import React, {Component} from 'react';

class WinsIndicator extends Component {
    constructor(props){
        super(props);
        // state
        this.state = {
        };
    }

    render(){
        return(
            <div className="winsIndicator">
                <div className="winsIndicator__circle"></div>
                <div className="winsIndicator__circle"></div>
                <div className="winsIndicator__circle"></div>
                <div className="winsIndicator__circle"></div>
                <div className="winsIndicator__circle"></div>
            </div>
        );
    }
}

export default WinsIndicator;
