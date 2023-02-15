export const SET_TOAST = "SET_TOAST";
export const SET_TOAST_LOADER="SET_TOAST_LOADER"
export const SET_TOAST_LOADER_FALSE= "SET_TOAST_LOADER_FALSE"
export const SET_MODEL_TRUE="SET_MODEL_TRUE"
export const SET_MODEL_FALSE="SET_MODEL_FALSE"
export const SET_IMAGES_DATA="SET_IMAGES_DATA"
export const SET_LAYERS="SET_LAYERS";
export const SET_LOAD_API="SET_LOAD_API"
export const SET_AUTH="SET_AUTH"
export const SET_LOAD="SET_LOAD"
export const SET_UN_LOAD="SET_UNLOAD"
export const setToast = (message) => {
	return {
		type: SET_TOAST,
		message:message

	}
}
export const setToastLoader = (message) => {
	return {
		type: SET_TOAST_LOADER,
		message:message

	}
}

export const setToastLoader_false = (message) => {
	return {
		type: SET_TOAST_LOADER_FALSE,
		message:message

	}
}

export const openModel = (data) => {
	return {
		type: SET_MODEL_TRUE,
		content:data.content,
		style:data.style
	}
}

export const CloseModel = (data) => {
	return {
		type: SET_MODEL_FALSE,
		content:data

	}
}

export const addImages = (data) => {
	return {
		type: SET_IMAGES_DATA,
		data:data

	}
}

export const setLayers = (data)=>{
	return {
		type: SET_LAYERS,
		data:data

	}
}

export const setLoadApi = (data)=>{
	return {
		type: SET_LOAD_API,
		data:data

	}
}


export const setAuth = (data)=>{
	return {
		type: SET_AUTH,
		data:data

	}
}


export const setLoader = (data)=>{

	return {
		type: SET_LOAD,
		data:data

	}
}