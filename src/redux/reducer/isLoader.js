import { SET_LOAD, SET_UN_LOAD } from "../actions/actions";



// reducer.js
const INITIAL_STATE = false



export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
     
        case SET_UN_LOAD:
            return action.data;
        case SET_LOAD:
            return action.data;
        default:
            return state
    }
};