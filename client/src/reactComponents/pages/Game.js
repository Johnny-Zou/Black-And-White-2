import React, {Component} from 'react';
import io from'socket.io-client';

import Lamp from "../elements/Lamp.js"
import WinsIndicator from "../elements/WinsIndicator.js"
import Chat from "../elements/Chat.js"
import Counter from "../elements/Counter.js"

// Redux
import { connect } from 'react-redux';

// Actions
import { changeUsePointVal, changeGameID, changeOpponentName, changeScore, changeMaxPointVal, changeOpponentLamp} from '../actions/changeGame.js';

class Game extends Component {
    constructor(props){
        super(props);

        this.handleCounterScroll = this.handleCounterScroll.bind(this);

        // Socket Event Handlers and emitters
        this.updateOpponentName = this.updateOpponentName.bind(this);
        this.handleError = this.handleError.bind(this);
        this.startGame = this.startGame.bind(this);
        this.updateLamps = this.updateLamps.bind(this);
        this.updateScore = this.updateScore.bind(this);
        this.updateInfo = this.updateInfo.bind(this);
        this.joinGameRoomCallback = this.joinGameRoomCallback.bind(this);

        this.playPoints = this.playPoints.bind(this);

        // State
        this.state = {
            info: "Waiting for opponent...",
            socket: null
        };
    }

    // React Lifecycle
    componentDidMount(){
        var clientSocket = io.connect('/');

        this.setState({socket: clientSocket});

        var sendData = {
            name: this.props.name,
            game_id: this.props.game_id,
        };

        clientSocket.emit("joinGameRoom", sendData, this.joinGameRoomCallback);
        
        // Handlers
        clientSocket.on("opponentJoined",this.updateOpponentName);
        clientSocket.on("error", this.handleError);
        clientSocket.on("startGame", this.startGame);
        clientSocket.on("updateLamps",this.updateLamps);
        clientSocket.on("updateScore",this.updateScore);
        clientSocket.on("updateInfo",this.updateInfo);
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
    playPoints(){
        var clientSocket = this.state.socket;

        var sendData = {
            points: this.props.use_point_val
        }
        clientSocket.emit("playPoints",sendData);
    }

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

    startGame(data){
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

    updateLamps(data){
        console.log(data);
        this.props.changeMaxPointVal(data.points);
        this.props.changeOpponentLamp(data.lamps);
    }

    updateScore(data){
        console.log(data);
        this.props.changeScore(data.score);
    }

    updateInfo(data){
        var newMsg = data.info;
        console.log(newMsg);
        this.setState({info: newMsg});
    }


    render(){
        return(
            <div className="page page__game">
                <div className="game__player game__player--left">
                    <h1 className="game__playerName">{this.props.name}</h1>
                    <Lamp type="left" mode="player" max_points={this.props.max_points}/>
                    <WinsIndicator winCount={this.props.score[0]} />
                </div>
                <div className="game__body">
                    <div className="game__status">{this.state.info}</div>
                    <Chat/>
                    <Counter clickFn={this.playPoints} scrollWheelFn={this.handleCounterScroll} value={this.props.use_point_val}/>
                </div>
                <div className="game__player game__player--right">
                    <h1 className="game__playerName">{this.props.opponent_name}</h1>
                    <Lamp type="right" mode="opponent" lamps={this.props.opponent_lamps}/>
                    <WinsIndicator winCount={this.props.score[1]}/>
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
        score: state.game.score,
        opponent_lamps: state.game.opponent_lamps
    });
};

export default connect(mapStateToProps, {changeUsePointVal,changeGameID,changeOpponentName, changeScore, changeMaxPointVal, changeOpponentLamp })(Game);
