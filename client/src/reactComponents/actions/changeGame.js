import { CHANGE_NAME, CHANGE_OPPONENT_NAME, CHANGE_USE_POINT_VAL, CHANGE_GAME_ID } from './types';

export function changeName(newName){
    return function(dispatch){
        dispatch({
            type: CHANGE_NAME,
            payload: newName
        });
    }
};

export function changeOpponentName(newName){
    return function(dispatch){
        dispatch({
            type: CHANGE_OPPONENT_NAME,
            payload: newName
        });
    }
};

export function changeUsePointVal(newVal){
    return function(dispatch){
        dispatch({
            type: CHANGE_USE_POINT_VAL,
            payload: newVal
        });
    }
};

export function changeGameID(newGameID){
    return function(dispatch){
        dispatch({
            type: CHANGE_GAME_ID,
            payload: newGameID
        });
    }
};