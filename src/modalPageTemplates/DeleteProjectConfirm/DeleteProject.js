
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CloseModel, setLoadApi, setToast, setToastLoader } from "../../redux/actions/actions";
import './DeleteProject.css'
import mdl from "../../images/Modal_Cloud.svg";
import ApiService from "../../services/apiService";
import { DELETE_PROJECT_ROUTE, GET_PROJECT_PAYLOADS } from "../../utils/api_constants";
function DeleteProject(props) {
    const dispatch = useDispatch()
    const api = new ApiService()
    const deleteProject = () => {
        GET_PROJECT_PAYLOADS.project_id = props.id
        closeModal()
        api.deleteRequest(DELETE_PROJECT_ROUTE, GET_PROJECT_PAYLOADS).then((response) => {
            dispatch(setLoadApi(true))
            dispatch(setToastLoader("Project Deleted Successfully"))
        }).catch((error) => {
            closeModal()
            dispatch(setToast("Server Error"))
        })
    }
    function closeModal() {
        dispatch(CloseModel(true))
    }
    return <div className="deletecontent">
        <img alt="" className="" src={mdl} />
        <h2>Are you sure you wanna delete it?</h2>
        <div className="buttondeleteflex">
            <button className="mdl-btn" onClick={closeModal}>
                No, Go back!
            </button>
            <button className="mdl-btn2" onClick={() => deleteProject()}>Yes, Go ahead!</button>
        </div>

    </div>
}

export default DeleteProject

