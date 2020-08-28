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
			opponent_name: global.data.gameDict[game_id].players[0]
		};
		startGame = true;
	}

	// Add the new player
	global.data.gameDict[game_id].addPlayer(data.name);
	socket.join(game_id);

	// call callback
	callback(sendData_joining);

	// Start the Game
	if(startGame) {
		var startPlayer = global.data.gameDict[game_id].startGame();
		var sendData_starting = {
			startPlayer: startPlayer
		};
		io.to(game_id).emit("startGame",sendData_starting);
	}
};
