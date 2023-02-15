import { SET_AUTH } from "../actions/actions";



// reducer.js
const INITIAL_STATE = true



export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
     
        case SET_AUTH:
            return action.data;
    
        default:
            return state
    }
};