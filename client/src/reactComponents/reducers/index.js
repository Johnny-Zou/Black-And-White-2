import { combineReducers } from 'redux';
import pageNavReducer from './pageNavReducer.js';

export default combineReducers({
	pageNav: pageNavReducer
});