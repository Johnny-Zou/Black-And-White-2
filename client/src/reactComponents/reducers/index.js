import { combineReducers } from 'redux';
import pageNavReducer from './pageNavReducer.js';
import gameReducer from './gameReducer.js';

export default combineReducers({
	pageNav: pageNavReducer,
	game: gameReducer
});