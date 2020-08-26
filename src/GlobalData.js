import Game from './Game.js';
// import Database from './db/Database.js';

class GlobalData {
	constructor(){
		this.gameDict = {};
		this.maxGames = 10;
		// this.mongoDB = new Database();
	}

	createNewGame(){
		if (Object.keys(this.gameDict).length < this.maxGames) {
			var game_id = this.generate_unique_game_id();

			this.gameDict[game_id] = new Game(game_id);
			// this.mongoDB.insertNewGame(gameid);
			return game_id;
		} else {
			console.log("Max games exceeded!")
			return -1;
		}
	}

	generate_unique_game_id(){
        while(true){
            var rand_id = Math.random().toString(36).substr(2,9);

            if(!(rand_id in this.gameDict)){
                return rand_id;
            }
        }
    }

    game_exists(game_id) {
    	return (game_id in this.gameDict);
    }
}

export default GlobalData;