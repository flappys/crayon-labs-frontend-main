import React from "react";
import { useHistory } from "react-router-dom";
import './breadcrumb.css';
function BreadCrumbs(props) {
    const history=useHistory()
    return <div className="center">

        <div className="breadflex">
          
            {props.text.map((x)=><div className={props.class}>
                <div className="breadtext">
                    {x.name}
                </div>
            </div>)}
        </div>
        
    </div>
}


export default BreadCrumbs;