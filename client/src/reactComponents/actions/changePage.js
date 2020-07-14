import { CHANGE_PAGE } from './types';

export function changePage(newPage){
    return function(dispatch){
        dispatch({
            type: CHANGE_PAGE,
            payload: newPage
        });
    }
};