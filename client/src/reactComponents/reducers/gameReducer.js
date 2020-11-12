import { CHANGE_NAME,
         CHANGE_OPPONENT_NAME, 
         CHANGE_USE_POINT_VAL, 
         CHANGE_GAME_ID, 
         CHANGE_GAME_SCORE, 
         CHANGE_MAX_POINTS, 
         CHANGE_OPPONENT_LAMP,
         ADD_NEW_MESSAGE } from '../actions/types.js';

const initialState = {
    name: "",
    game_id: "",
    opponent_name: "???",
    max_points: 99,
    use_point_val: 0,
    score: [0,0],
    opponent_lamps: 5,
    chatLog: []
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
        case CHANGE_GAME_ID:
            return {
                ...state,
                game_id: action.payload
            };
        case CHANGE_GAME_SCORE:
            return {
                ...state,
                score: action.payload
            }
        case CHANGE_MAX_POINTS:
            return {
                ...state,
                max_points: action.payload
            }
        case CHANGE_OPPONENT_LAMP:
            return {
                ...state,
                opponent_lamps: action.payload
            }
        case ADD_NEW_MESSAGE:

            return {
                ...state,
                chatLog: [...state.chatLog, action.payload]
            }
        default:
            return state;
    }
}