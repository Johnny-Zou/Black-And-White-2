import Player from './Player.js';
import assert from "assert";

class Game {
	constructor(game_id){
		this.id = game_id;
		this.players = [];


		// Game state
		this.gameState = "WAITING";
		this.round = 0;
		this.currPlayer = -1;
		this.score = [0,0];
		this.round_pts = [-1,-1];
		this.total_pts = [99,99];
	}

	// Add Player
		// Description: Adds a new Player to the game
		// Inputs: 
			// socket_id - the ID of the socket attached to the newly created player
			// player_name - the name of the newly created player
		// Returns: 0 on success, -1 on error (2 players already in game)
	addPlayer(socket_id, player_name){
		if(this.players.length < 2){
			var newPlayer = new Player(socket_id,player_name);
			this.players.push(newPlayer);
			return 0;
		}
		return -1;
	}

	// Change Game State
		// Description: changes the game state to a new state
		// Inputs: newState - the new game state to be changed
		// Returns: 0 on success
	changeGameState(newState) {
		this.gameState = newState;
		return 0;
	}

	// Start Game
		// Description: Initializes the game by randomly selecting the player that starts 
		// Inputs: none
		// Returns: the Player object that has the first move
	startGame(){
		// Random number between 0 and 1
		this.currPlayer = Math.floor(Math.random() * 2);
		return this.players[this.currPlayer];
	}

	// Increment round number
		// Description: increments the round counter and then returns the next round
		// Inputs: none
		// Returns: new round number
	incrementRound(){
		this.round += 1;
		return this.round;
	}

	// Play Points
		// Description: Allows the player to play points in a particular round
		// Input:
			// player_id - the id of the player trying to play points
			// points - the player that is playing the points
		// Returns: player's remaining points on success, -1 on error (not that players turn)
	playPoints(player_id, points){
		// Check that the correct player is playing
		assert.strictEqual(player_id,this.players[this.currPlayer].id, "ERROR: (class Game, fn playPoints) wrong player playing");

		this.round_pts[this.currPlayer] = points;
		this.total_pts[this.currPlayer] -= points;
		return 0;
	}

	// Change Player
		// Description: Changes the current player that is suppose to be playing points
		// Input: newPlayer - changes to a specific player index if provided, otherwise if -1, changes to player not playing
		// Returns: the index of the new player playing
	changePlayer(newPlayer){
		if (newPlayer == -1 || newPlayer == 2){
			this.currPlayer = (this.currPlayer + 1) % 2;
		} else {
			this.currPlayer = newPlayer;
		}
		
		return this.currPlayer;
	}

	// Player ID to index
		// Description: Converts the player_id to the index in the player array
		// Input:
			// player_id - the player_id (equivalent to socket_id) to convert to index
		// Returns: index from this.players which contains the Player object that has id = player_id, returns -1 if id cannot be found
	player_id_to_index(player_id){
		if(this.players[0].id === player_id){
			return 0;
		} else if (this.players[1].id === player_id){
			return 1;
		} else {
			return -1;
		}
	}

	// Get Winner
		// Description: Returns the winner of the round
		// Input: none
		// Returns: 0 if this.players[0] won, 1 if this.players[1] won, 2 on tie, -1 on error (player has not played yet)
	getWinner(){
		assert.notStrictEqual(this.round_pts,[-1,-1], "ERROR: (class Game, fn getWinner) Neither player have played yet");
		assert.notStrictEqual(this.round_pts[0],-1, "ERROR: (class Game, fn getWinner) Player 0 hasn't played yet");
		assert.notStrictEqual(this.round_pts[1],-1, "ERROR: (class Game, fn getWinner) Player 1 hasn't played yet");

		if ( this.round_pts[0] > this.round_pts[1] ) {
			// Player 0 won
			return 0;
		} else if ( this.round_pts[0] < this.round_pts[1] ) {
			// Player 1 won
			return 1;
		} else {
			// Tie
			return 2;
		}
	}

	// Get Overall Game Winner
		// Description: returns the id of the overall winner
		// Input: none
		// Returns: 0 if this.players[0] won, 1 if this.players[1] won, 2 on tie, -1 on error
	getGameWinner(){
		assert.strictEqual(this.gameEnd(),true,"ERROR: (class Game, fn getGameWinner) Game has not ended yet");

		if(this.score[0] > this.score[1]){
			return 0;
		} else if (this.score[0] < this.score[1]) {
			return 1;
		} else {
			// tie
			return 2;
		}
	}

	// Update Score
		// Description: Updates the score for after a round has been completed
		// Input: winner - the player index that won the previous round
		// Returns: 0 on success, 1 on failure
	updateScore(winner){
		if (winner != 2) {
			this.score[winner] += 1;
		}
		return 0;
	}

	// Reset Round
		// Description: resets the variables for a fresh round
		// Input: none
		// Returns: 0 on success, -1 on failure
	resetRound(){
		this.round_pts = [-1,-1];
	}

	// Game End
		// Description: Checks if the game has ended
		// Input:
		// Returns: True on game completion and False otherwise.
	gameEnd(){
		if (this.score[0] >= 5 || this.score[1] >= 5){
			return true;
		}

		if (this.round >= 9) {
			return true;
		}

		return false;
	}

	// check Player can play
	checkPlayerCanPlay(player_id,points){
		var index = this.player_id_to_index(player_id);
		if (index === -1){
			// console.log("1")
			return false;
		}

		if (this.round_pts[index] != -1) {
			// console.log("2")
			return false;
		}

		if(index != this.currPlayer) {
			// console.log("3")
			return false;
		}

		if(this.total_pts[index] < points) {
			// console.log("4")
			return false;
		}

		if(this.gameState === "WAITING" || this.gameState === "ENDED"){
			return false;
		}

		return true;
	}

	// Get Lamps
	getLamps(player){
		var points = this.total_pts[player];

		if(points >= 80){
			return 5;
		} else if(points >= 60){
			return 4;
		} else if(points >= 40){
			return 3;
		} else if(points >= 20){
			return 2;
		} else {
			return 1;
		}
	}

}

export default Game;