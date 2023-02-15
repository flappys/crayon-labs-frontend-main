import { SET_MODEL_FALSE, SET_MODEL_TRUE } from "../actions/actions";


// reducer.js
const INITIAL_STATE = { show: false, content: "", style: "" };;



export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_MODEL_TRUE:
            return { show: true, content:action.content ,style:action.style };
        case SET_MODEL_FALSE:
            return {
                show: false, content: action.content 
            };

        default:
            return { show: false, content: "" };
    }
};