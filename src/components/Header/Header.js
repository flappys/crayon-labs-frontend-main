
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { HEADER_MENU } from "../../utils/globals";
import './Header.css'
import {Link} from 'react-scroll'

function Header() {
    const [menuToggle, setToggle] = useState(false)
    const history = useHistory()
    useEffect(() => {

    }, [])

    const onToggle = () => {
        if (menuToggle) {
            setToggle(false)
        }
        else {
            setToggle(true)
        }
    }
    const gotoLogin = (name) => {
        if (name == "Start Minting"){
            if(localStorage.getItem("token")!=null){
                history.push("/dashboard")
            }
            else{
                history.push("/login")
            }
        }
    }
    return <div className="center">
        <div className="headerflex">
            <div className="headermainco1">
                <img className="headerlogo" onClick={()=>history.push("/")} src={HEADER_MENU.logoIcon}></img>
            </div>
            <div className="headermainco1">
                <div className="menu">
                    <ul >
                        {HEADER_MENU.menu.map((data) => 
                            // <li key={data.id} onClick={()=>gotoLogin(data.name)} className={data.active ? "listitem active" : "listitem"}>
                            //     {data.scroll == true ? <Link  to={data.header_id} spy={true} smooth={true}>{data.name}</Link> : data.name }
                            // </li>
                            <>
                            {data.scroll == true ? <Link 
                             to={data.header_id} spy={true} smooth={true}>
                                <li key={data.id} onClick={()=>gotoLogin(data.name)} className={data.active ? "listitem active" : "listitem"}>
                                    {data.name}</li></Link> : 
                                <li key={data.id} onClick={()=>gotoLogin(data.name)} className={data.active ? "listitem active" : "listitem"}>
                                {data.name} </li>}
                            </>
                            )}
                    </ul>
                </div>
            </div>
        </div>
        <div className="header_mob">
            <div className="headermainco1">
                <img  onClick={()=>history.push("/")} src={HEADER_MENU.logoIcon}></img>
            </div>
            <div className="headermainco1">
              <img onClick={()=>onToggle()} className="img_icon" src="https://img.icons8.com/office/16/000000/menu--v2.png"></img>
            </div>


        </div>

        {menuToggle == true && <div className="menu_mob">
            <ul>
                {HEADER_MENU.menu.map((data) => <li className="menuItems">{data.name}</li>)}
            </ul>
        </div>}
    </div>
}

export default Header

