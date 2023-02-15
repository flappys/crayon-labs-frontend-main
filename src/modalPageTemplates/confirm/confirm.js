import React, { useEffect, useRef, useState, useCallback } from "react";
import { CloseModel } from "../../redux/actions/actions";
import './confirm.css'
import { useDispatch } from 'react-redux';
function Confirm(props){
    const dispatch=useDispatch()
    return <div>
        <h3 className="title_confirm">{props.data.title}</h3>

        <div className="body_content">
            <p >{props.data.SUBCONTENT}</p>
        </div>
        <div className="buttonflexes">
            <div className="main_btn" onClick={()=>props.deletWhiteList(props.acc)}>{props.data.BUTTON_TITLE}</div>
            <div className="main_btn" onClick={()=>dispatch(CloseModel(false))}>Cancel</div>
        </div>
    </div>
}


export default Confirm;