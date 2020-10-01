import React, {Component} from 'react';

class WinsIndicator extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="winsIndicator">
                <div className={"winsIndicator__circle" + (this.props.winCount >= 1 ? ' winsIndicator__circle--filled' : '')}></div>
                <div className={"winsIndicator__circle" + (this.props.winCount >= 2 ? ' winsIndicator__circle--filled' : '')}></div>
                <div className={"winsIndicator__circle" + (this.props.winCount >= 3 ? ' winsIndicator__circle--filled' : '')}></div>
                <div className={"winsIndicator__circle" + (this.props.winCount >= 4 ? ' winsIndicator__circle--filled' : '')}></div>
                <div className={"winsIndicator__circle" + (this.props.winCount >= 5 ? ' winsIndicator__circle--filled' : '')}></div>
            </div>
        );
    }
}

export default WinsIndicator;
