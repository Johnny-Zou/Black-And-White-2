import Player from './Player.js';
import assert from "assert";

class Game {
	constructor(game_id){
		this.id = game_id;
		this.players = [];
		this.currPlayer = -1;

		// Game state
		this.score = [0,0];
		this.round_pts = [-1,-1];
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

	// Start Game
		// Description: Initializes the game by randomly selecting the player that starts 
		// Inputs: none
		// Returns: the Player object that has the first move
	startGame(){
		// Random number between 0 and 1
		this.currPlayer = Math.floor(Math.random() * 2) + 1;

		return this.players[this.currPlayer];
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

		this.changePlayer();
		return 0;
	}

	// Change Player
		// Description: Changes the current player that is suppose to be playing points
		// Input: none
		// Returns: the index of the new player playing
	changePlayer(){
		this.currPlayer = (this.currPlayer + 1) % 2;
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
		} else if (this.players[0].id === player_id){
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
		assert.notStrictEqual(this.round_pts,[-1,-1], "ERROR: (class Game, fn getWinner) Neither player has played yet");
		assert.notStrictEqual(this.round_pts[0],-1, "ERROR: (class Game, fn getWinner) Player 0 has played yet");
		assert.notStrictEqual(this.round_pts[1],-1, "ERROR: (class Game, fn getWinner) Player 1 has played yet");

		if ( round_pts[0] > round_pts[1] ) {
			// Player 0 won
			return 0;
		} else if ( round_pts[0] > round_pts[1] ) {
			// Player 1 won
			return 1;
		} else {
			// Tie
			return 2;
		}
	}

	// Reset Round
		// Description: resets the variables for a fresh round
		// Input: none
		// Returns: 0 on success, -1 on failure
	resetRound(){
		this.round_pts = [-1,-1];
	}


}

export default Game;