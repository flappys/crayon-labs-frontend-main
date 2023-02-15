import React, { useState } from "react";
import {  HEADER_MENU } from "../../../../utils/globals";
import './header.css';
import profile from '../../../../images/profile.png'
import { useHistory } from "react-router-dom";

function DashboardHeader(props) {
    const [HeaderData,setHeader]=useState(props.DATA)
    const history=useHistory()
    const onClickBread = (input)=>{
        if(input.name=="Logout"){
            localStorage.removeItem("token");
            localStorage.removeItem("id");
        }
        history.push(input.route)
    }
    
    function logout(){
        localStorage.removeItem("token");
        localStorage.removeItem("id");

        history.push("/")
    }

    return <div>
      
        <div className='center'>
            <div className="headertopflex">
                <div className="headermain">
                    <img  onClick={()=>history.push("/")} alt="slide" src={HEADER_MENU.logoIcon} className="imgIcon_mob"></img>
                </div>
                <div className="headermain">
                    <div className="secondaryflex">
                        {HeaderData.map((x,index)=><a onClick={()=>onClickBread(x)} key={index} className="breadtextline">{x.name}</a>)}
                        {/* <img alt="slide" src={profile} className="imgIcon_mob"></img> */}
                          <div class="dropdown-profile">
                        <img alt="slide" src={profile} className="profile_Icon"></img>
                        <div class="dropdown-content">
                            <a onClick={()=>logout()}>Logout</a>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="button_log_out">Log out</div> */}
        </div>
    </div>
}


export default DashboardHeader;