import { SET_IMAGES_DATA } from "../actions/actions";



// reducer.js
const INITIAL_STATE = { image_data: [] };



export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_IMAGES_DATA:
            return { image_data: action.data }
        default:
            return { image_data: [] }
    }
};