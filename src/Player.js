class Player {
	constructor(player_id, player_name){
		// Player ID = Socket ID
		this.id = player_id;
		this.name = player_name;
		this.total_points = 99;
	}
}

export default Player;