import { SET_LAYERS } from "../actions/actions";




// reducer.js
const INITIAL_STATE = { layers:[]};



export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
     
        case SET_LAYERS:
            return action.data 
        default:
            return state;
    }
};