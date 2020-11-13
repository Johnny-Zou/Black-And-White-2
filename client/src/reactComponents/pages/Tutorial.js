import React, {Component} from 'react';
import Button from "../elements/Button.js";

// Redux
import { connect } from 'react-redux';

// Actions
import { changePage } from '../actions/changePage.js';

class Tutorial extends Component {
    constructor(props){
        super(props);
    }

    handlePageChange(newPage){
        this.props.changePage(newPage);
    }

    render(){
        return(
            <div className="page page__tutorial">
                <div className="page_content_scrollWrapper">
                    <div className="page__content">
                        <div className="page__title">How to Play</div>
                        <p>The rules are simple, each player starts off with a total of 99 points. The player who starts the first round is decided randomly. During each round, each player uses a portion of their points in an attempt to play a higher number than the opposing player. The first player to win more than 5 rounds wins the game. If neither player reaches 5 wins then the player that has won the most rounds by the end of the 9th round will win. Each round occurs as follows</p>
                        <div className="page__subtitle">Example Round</div>
                        <p>Lets say we have players A and B, then:</p>
                        <ol>
                            <li>A plays a number</li>
                            <li>B receives a color depending on What A plays</li>
                            <ul>
                                <li>If A plays a number greater or equal to 10, B receives WHITE</li>
                                <li>if A plays a number less than 10, B receives BLACK</li>
                            </ul>
                            <li>B also receives information about both players current LAMP status</li>
                            <li>B players a number</li>
                            <li>The round concludes and information is given to each player</li>
                            <ul>
                                <li>Winner of last round</li>
                                <li>Current score</li>
                                <li>Both player's LAMP status</li>
                            </ul>
                            <li>New round starts with the previous round winner going first</li>
                            <ul>
                                <li>In the event of a tie, points are still deducted from totals, however the first player of the previous round now plays second</li>
                            </ul>
                        </ol>
                        <div className="page__subtitle">Lamps</div>
                        <p>Lamps indicate roughly how many points a player has, the range is as follows:</p>
                        <p>80 - 99        5 LAMPS ON</p>
                        <p>60 - 79        4 LAMPS ON</p>
                        <p>40 - 59        3 LAMPS ON</p>
                        <p>20 - 39        2 LAMPS ON</p>
                        <p>0 - 19         1 LAMPS ON</p>

                        <p>When a player uses enough points to drop a boundary, a lamp will go off indicating to the opponent that a point boundary has been passed.</p>
                        <br></br>
                        <p>More Information about the game can be found <a href="http://the-genius.wikia.com/wiki/Black_and_White_II">here</a></p> 

                    </div>
                </div>
                <Button type="white" title="Back" clickFn={this.handlePageChange.bind(this,"Menu")}/>
            </div>
        );
    }
}

export default connect(null, { changePage })(Tutorial);