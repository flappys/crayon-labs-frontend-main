import {combineReducers} from 'redux';
import toast from './toast'
import ShowModal from './ShowModal' 
import getImages from './getImages'
import Layers from './Layers'
import LoadApi from './LoadApi'
import isAuth from './isAuth'
import isLoader from './isLoader'
const allReducers = combineReducers({
    toast: toast,
    Showmodal:ShowModal,
    getImages:getImages,
    Layers:Layers,
    LoadApi:LoadApi,
    isAuth:isAuth,
    isLoader:isLoader
});
export default allReducers