# Black And White II - IN PROGRESS

This is a two player death match game that orginated from season 3 of _The Genius_. I do not take any credit for the creation of this game. This app was made using winSock to communicate between two computers (server and client) and requires 2 windows computers to play.


## How to play

The rules are simple, each player starts off with a total of 99 points. The player who starts the first round is decided randomly. During each round, each player uses a portion of their points in an attempt to play a higher number than the opposing player. The first player to win more than 5 rounds wins the game. If neither player reaches 5 wins then the player that has won the most rounds by the end of the 9th round will win. Each round occurs as follows:

Lets say we have players A and B, then:

1. A plays a number
2. B recieves a color depending on What A plays
	* If A plays a number greater or equal to 10, B recieves WHITE
	* if A plays a number less than 10, B receives BLACK
3. B also recieves information about both's players current LAMP status
4. B players a number
5. The round concludes and information is given to each player
	* Winner of last round
	* Current score 
	* Both player's LAMP status
6. New round starts with the previous round's winner going first
	* In the event of a tie, points are still deducted from totals, however the first player of the previous round now plays second

## LAMP

Lamps indicate roughly how many points a player has, the range is as follows:

80 - 99        5 LAMPS ON <br>
60 - 79        4 LAMPS ON <br>
40 - 59        3 LAMPS ON <br>
20 - 39        2 LAMPS ON <br>
&nbsp;&nbsp;0 - 19        1 LAMPS ON <br>

When a player uses enough points to drop a boundary, a lamp will go off indicating to the opponent that a point boundary has been passed.

<<<<<<< HEAD
#### More Information about the game can be found at http://the-genius.wikia.com/wiki/Black_and_White_II
