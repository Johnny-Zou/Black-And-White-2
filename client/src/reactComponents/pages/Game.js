import React, {Component} from 'react';

import Lamp from "../elements/Lamp.js"
import WinsIndicator from "../elements/WinsIndicator.js"
import Chat from "../elements/Chat.js"
import Counter from "../elements/Counter.js"

// Redux
import { connect } from 'react-redux';

// Actions
import { changeUsePointVal } from '../actions/changeUsePointVal.js';

class Game extends Component {
    constructor(props){
        super(props);

        this.handleCounterScroll = this.handleCounterScroll.bind(this);
    }

    handleCounterScroll(e){
        var newVal = this.props.use_point_val;
        if(e.deltaY < 0){
            if(newVal < this.props.max_points){
                newVal += 1;
            }
        } else if(e.deltaY > 0){
            if(newVal > 0){
                newVal -= 1;
            }
        }
        this.props.changeUsePointVal(newVal);
    }

    render(){
        return(
            <div className="page page__game">
                <div className="game__player game__player--left">
                    <h1 className="game__playerName">{this.props.name}</h1>
                    <Lamp type="left"/>
                    <WinsIndicator/>
                </div>
                <div className="game__body">
                    <div className="game__status">Waiting for opponent...</div>
                    <Chat/>
                    <Counter scrollWheelFn={this.handleCounterScroll} value={this.props.use_point_val}/>
                </div>
                <div className="game__player game__player--right">
                    <h1 className="game__playerName">{this.props.opponent_name}</h1>
                    <Lamp type="right"/>
                    <WinsIndicator/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return({
        name: state.game.name,
        opponent_name: state.game.opponent_name,
        max_points: state.game.max_points,
        use_point_val: state.game.use_point_val,
    });
};

export default connect(mapStateToProps, {changeUsePointVal})(Game);
