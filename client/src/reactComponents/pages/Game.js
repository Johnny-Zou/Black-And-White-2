import React, {Component} from 'react';
import io from'socket.io-client';

import Lamp from "../elements/Lamp.js"
import WinsIndicator from "../elements/WinsIndicator.js"
import Chat from "../elements/Chat.js"
import Counter from "../elements/Counter.js"

// Redux
import { connect } from 'react-redux';

// Actions
import { changeUsePointVal, changeGameID, changeOpponentName } from '../actions/changeGame.js';

class Game extends Component {
    constructor(props){
        super(props);

        this.handleCounterScroll = this.handleCounterScroll.bind(this);
        this.joinGameRoomCallback = this.joinGameRoomCallback.bind(this);

        // Socket Event Handlers
        this.updateOpponentName = this.updateOpponentName.bind(this);
        this.handleError = this.handleError.bind(this);
        this.startGame = this.startGame.bind(this);

        // State
        this.state = {
            info: "Waiting for opponent..."
        };
    }

    // React Lifecycle
    componentDidMount(){
        this.socket = io.connect('/');

        var sendData = {
            name: this.props.name,
            game_id: this.props.game_id,
        };

        this.socket.emit("joinGameRoom", sendData, this.joinGameRoomCallback);
        
        // Handlers
        this.socket.on("opponentJoined",this.updateOpponentName);
        this.socket.on("error", this.handleError);
        this.socket.on("startGame", this.startGame);
    }

    // Handlers
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

    // SocketIO
    joinGameRoomCallback(data){
        console.log(data)
        if (this.props.game_id == ""){
            // change the game id to the game id sent by the server
            this.props.changeGameID(data.game_id);
        }

        this.updateOpponentName(data);        
    }

    updateOpponentName(data){
        if(data.opponent_name){
            this.props.changeOpponentName(data.opponent_name);
        }
    }

    handleError(data){
        console.log(data);
        switch(data.id) {
            case 1:
                console.log(data.msg);
                break;
            default:
                console.log(data.msg);
        }
    }

    startGame(data) {
        // Initialize Start Counter
        var counter = 3;
        const startCounterInterval = setInterval(() => {
            var newMsg = "Starting Game in " + counter + "...";
            counter -= 1;
            if(counter == 0) {
                clearInterval(startCounterInterval);
                // Announce first player
                setTimeout(() => {
                    var startPlayer = data.startPlayer;
                    var newMsg = startPlayer + " to play...";
                    this.setState({info: newMsg});
                },1000);
            }
            this.setState({info: newMsg});
        }, 1000);
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
                    <div ref={this.infoRef} className="game__status">{this.state.info}</div>
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
        game_id: state.game.game_id,
        max_points: state.game.max_points,
        use_point_val: state.game.use_point_val,
    });
};

export default connect(mapStateToProps, {changeUsePointVal,changeGameID,changeOpponentName})(Game);
