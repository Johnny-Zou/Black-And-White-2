import React, {Component} from 'react';

class WinsIndicator extends Component {
    constructor(props){
        super(props);
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
