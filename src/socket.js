export function joinGameRoom(io, socket, data, callback){
	var startGame = false;
	if(data.game_id == ""){
		// create a new gameroom
		var game_id = global.data.createNewGame();

		var sendData_joining = {
			game_id: game_id
		};
	} else {
		// Check that the game exists and there is one player waiting
		var game_id = data.game_id;

		if (!global.data.game_exists(game_id)){
			var errorData = {
				"id": 1,
				"msg": "The game id " + game_id + " does not exist"
			}
			io.emit("error", errorData);
			return;
		}
		// Tell the player waiting the name of the opponent who has joined
		var sendData_waiting = {
			"opponent_name": data.name
		};
		io.to(game_id).emit("opponentJoined",sendData_waiting);

		var sendData_joining = {
			game_id: game_id,
			opponent_name: global.data.gameDict[game_id].players[0].name
		};
		startGame = true;
	}

	// Add the new player
	global.data.gameDict[game_id].addPlayer(socket.id, data.name);
	socket.name = data.name;
	socket.game_id = game_id;
	socket.join(game_id);
	updateMessage(io,socket,game_id,"systemMessage",null, socket.name + " has joined the room");

	// call callback
	callback(sendData_joining);

	// Start the Game
	if(startGame) {
		var startPlayer = global.data.gameDict[game_id].startGame();
		var sendData_starting = {
			startPlayer: startPlayer.name
		};
		global.data.gameDict[game_id].changeGameState("PLAYING_1");
		io.to(game_id).emit("startGame",sendData_starting);
	}
};

export function playPoints(io, socket, data, callback) {
	// Check that the correct player is playing the points
	var game_id = socket.game_id;
	var currentPlayer = global.data.gameDict[game_id].currPlayer;

	if(!global.data.gameDict[game_id].checkPlayerCanPlay(socket.id,data.points)) {
		// Error wrong player playing
		updateMessage(io,socket,socket.id,"systemMessage",null, "Wait your turn!");
		
		return;
	}

	global.data.gameDict[game_id].playPoints(socket.id,data.points);

	var newTotal = global.data.gameDict[game_id].total_pts[global.data.gameDict[game_id].currPlayer];
	updateMessage(io,socket,socket.id,"systemMessage",null, "You played " + data.points + " points! Total is now at " + newTotal);

	if (global.data.gameDict[game_id].gameState === "PLAYING_1"){
		var currPlayer_id = global.data.gameDict[game_id].changePlayer(-1);

		// Broadcast message to update whos playing
		// var currPlayer_name = global.data.gameDict[game_id].players[currPlayer_id].name;
		// updateMessage(io,socket,game_id,"systemMessage",null, currPlayer_name + " to play");

		global.data.gameDict[game_id].changeGameState("PLAYING_2");

		updateClientLamps(io,socket,game_id,currentPlayer);
		updateClientInfo(io,socket,game_id,global.data.gameDict[game_id].players[global.data.gameDict[game_id].currPlayer].name + " to play");
	} else if (global.data.gameDict[game_id].gameState === "PLAYING_2") {
		var winner = global.data.gameDict[game_id].getWinner();

		// Update winner
		global.data.gameDict[game_id].updateScore(winner);
		global.data.gameDict[game_id].resetRound();
		var currPlayer_id = global.data.gameDict[game_id].changePlayer(winner);

		// Broadcast who won previous round
		if (winner === 2){
			updateMessage(io,socket,game_id,"systemMessage",null, "Last round was a tie");
		} else {
			var winner_name = global.data.gameDict[game_id].players[winner].name;
			updateMessage(io,socket,game_id,"systemMessage",null, winner_name + " won the previous round");
		}

		// Broadcast message on current score
		var current_score = global.data.gameDict[game_id].score;
		var p0_name = global.data.gameDict[game_id].players[0].name;
		var p1_name = global.data.gameDict[game_id].players[1].name;
		var score_string = current_score[0] + " (" + p0_name + ") : " + current_score[1] + " (" + p1_name + ")";
		updateMessage(io,socket,game_id,"systemMessage",null, "Current Score is at: " + score_string);

		// Broadcast message to update who's playing
		// var currPlayer_name = global.data.gameDict[game_id].players[currPlayer_id].name;
		// updateMessage(io,socket,game_id,"systemMessage",null, currPlayer_name + " to play");

		if (global.data.gameDict[game_id].gameEnd()){
			global.data.gameDict[game_id].changeGameState("ENDED");
			// get the winner name
			var game_winner_name = winner_name;
			updateClientLamps(io,socket,game_id,currentPlayer);
			updateClientScore(io,socket,game_id,winner);
			updateClientInfo(io,socket,game_id,"Game Over! " + game_winner_name + " has won the game");
			updateMessage(io,socket,game_id,"systemMessage",null, game_winner_name + " won the game");
		} else {
			global.data.gameDict[game_id].changeGameState("PLAYING_1");
			updateClientLamps(io,socket,game_id,currentPlayer);
			updateClientScore(io,socket,game_id,winner);
			updateClientInfo(io,socket,game_id,global.data.gameDict[game_id].players[global.data.gameDict[game_id].currPlayer].name + " to play");
		}
	}	
};

export function sendMessage(io, socket, data, callback){
	var content = data.content;
	var game_id = socket.game_id;
	var playerIndex = global.data.gameDict[game_id].player_id_to_index(socket.id);
	var sender = global.data.gameDict[game_id].players[playerIndex].name;

	updateMessage(io,socket,game_id,"playerMessage",sender,content);
}

function updateClientLamps(io,socket,game_id,lastPlayer){

	var otherPlayer = (lastPlayer + 1) % 2;
	var p1_id = global.data.gameDict[game_id].players[lastPlayer].id;
	var p2_id = global.data.gameDict[game_id].players[otherPlayer].id;

	var p1_sendData = {
		"points": global.data.gameDict[game_id].total_pts[lastPlayer],
		"lamps": global.data.gameDict[game_id].getLamps(otherPlayer),
	};

	var p2_sendData = {
		"points": global.data.gameDict[game_id].total_pts[otherPlayer],
		"lamps": global.data.gameDict[game_id].getLamps(lastPlayer)
	};

	io.to(p1_id).emit("updateLamps",p1_sendData);
	io.to(p2_id).emit("updateLamps",p2_sendData);
}

function updateClientScore(io,socket,game_id,winner){
	if(winner == 2){
		return;
	}

	var score = global.data.gameDict[game_id].score;

	var p1_id = global.data.gameDict[game_id].players[0].id;
	var p2_id = global.data.gameDict[game_id].players[1].id;


	var p1_sendData = {
		"score": global.data.gameDict[game_id].score,
		"winner": global.data.gameDict[game_id].players[winner].name
	};

	var p2_sendData = {
		"score": global.data.gameDict[game_id].score.slice().reverse(),
		"winner": global.data.gameDict[game_id].players[winner].name
	};

	io.to(p1_id).emit("updateScore",p1_sendData);
	io.to(p2_id).emit("updateScore",p2_sendData);
}

function updateClientInfo(io,socket,game_id,info){
	var sendData = {
		"info": info
	}

	io.to(game_id).emit("updateInfo",sendData);
}

function updateMessage(io,socket,target,type,sender,content){
	var sendData = {
		"type": type,
		"sender": sender,
		"content": content
	}

	io.to(target).emit("updateMessage", sendData);
}