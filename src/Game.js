class Game {
	constructor(game_id){
		this.id = game_id;
		this.players = [];
		this.currPlayer = -1;
	}

	addPlayer(name){
		if(this.players.length < 2){
			this.players.push(name);
		}
	}
	startGame(){
		// Random number between 0 and 1
		this.currPlayer = Math.floor(Math.random() * 2) + 1;

		return this.players[this.currPlayer];
	}
}

export default Game;