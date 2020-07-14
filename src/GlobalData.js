import Game from './Game.js';
import Database from './db/Database.js';

class GlobalData {
	constructor(){
		this.gameArray = {};
		this.maxGames = 10;
		this.mongoDB = new Database();
	}

	createNewGame(){
		if (this.gameArray.length < this.maxGames) {
			var game_id = this.generate_unique_game_id();

			this.gameArray[game_id] = new Game(game_id);
			this.mongoDB.insertNewGame(gameid);
		} else {
			console.log("Max games exceeded!")
		}
		
	}

	generate_unique_game_id(){
        while(true){
            var rand_id = Math.random().toString(36).substr(2,9);

            if(!(rand_id in this.gameArray)){
                return rand_id;
            }
        }
    }
}

export default GlobalData;