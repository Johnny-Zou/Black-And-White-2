class Game {
	constructor(game_id){
		this.id = game_id;
		this.players = [];
	}

	addPlayer(name){
		if(this.players.length < 2){
			this.players.push(name);
		}
	}
}

export default Game;