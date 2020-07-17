import { CHANGE_NAME, CHANGE_OPPONENT_NAME, CHANGE_USE_POINT_VAL } from '../actions/types.js';

const initialState = {
    name: "Johnny",
    opponent_name: "???",
    max_points: 99,
    use_point_val: 0
};

export default function(state = initialState, action) {
    switch (action.type) {
        case CHANGE_NAME:
            return {
                ...state,
                name: action.payload
            };
        case CHANGE_OPPONENT_NAME:
            return {
                ...state,
                opponent_name: action.payload
            };
        case CHANGE_USE_POINT_VAL:
            return {
                ...state,
                use_point_val: action.payload
            };
    default:
        return state;
    }
}