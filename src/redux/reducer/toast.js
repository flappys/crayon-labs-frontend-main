import { SET_TOAST, SET_TOAST_LOADER, SET_TOAST_LOADER_FALSE } from "../actions/actions";

// reducer.js
const INITIAL_STATE = {show:false,message:"",toastFormat:"error"};;



export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case SET_TOAST:
			return {show:true,message:action.message,toastFormat:"error"};
		case SET_TOAST_LOADER:
			console.log("inner");
		return {show:true,message:action.message,toastFormat:"success"};
		case SET_TOAST_LOADER_FALSE:
		return {show:false,message:action.message,toastFormat:"loading"};
		default:
			return state;
	}
};