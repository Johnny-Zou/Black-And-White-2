import React, {Component} from 'react';

import Lamp from "../elements/Lamp.js"
import WinsIndicator from "../elements/WinsIndicator.js"
import Chat from "../elements/Chat.js"
import Counter from "../elements/Counter.js"

class Game extends Component {
    constructor(props){
        super(props);
        // state
        this.state = {
        };
    }

    render(){
        return(
            <div className="page page__game">
                <div className="game__player">
                    <Lamp/>
                    <WinsIndicator/>
                </div>
                <div className="game__body">
                    <div className="game__status">Waiting for opponent...</div>
                    <Chat/>
                    <Counter value="30"/>
                </div>
                <div className="game__opponent">
                    <Lamp/>
                    <WinsIndicator/>
                </div>
            </div>
        );
    }
}

export default Game;
