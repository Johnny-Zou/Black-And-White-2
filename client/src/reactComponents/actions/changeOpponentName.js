import { CHANGE_OPPONENT_NAME } from './types';

export function changeOpponentName(newName){
    return function(dispatch){
        dispatch({
            type: CHANGE_OPPONENT_NAME,
            payload: newName
        });
    }
};