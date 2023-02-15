import { SET_LOAD_API } from "../actions/actions";



// reducer.js
const INITIAL_STATE = false



export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_LOAD_API:
            return action.data;
    
        default:
            return state
    }
};