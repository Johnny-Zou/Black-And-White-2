import { CHANGE_PAGE } from '../actions/types.js';

const initialState = {
    currPage: "Menu"
};

export default function(state = initialState, action) {
    switch (action.type) {
        case CHANGE_PAGE:
            return {
                ...state,
                currPage: action.payload
            };
    default:
        return state;
    }
}