import { CHANGE_NAME } from './types';

export function changeName(newName){
    return function(dispatch){
        dispatch({
            type: CHANGE_NAME,
            payload: newName
        });
    }
};