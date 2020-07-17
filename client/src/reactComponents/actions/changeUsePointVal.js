import { CHANGE_USE_POINT_VAL } from './types';

export function changeUsePointVal(newVal){
    return function(dispatch){
        dispatch({
            type: CHANGE_USE_POINT_VAL,
            payload: newVal
        });
    }
};