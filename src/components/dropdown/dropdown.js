
import React, { useEffect, useState } from "react";
import './dropdown.css'
function Dropdown(props){
       
    return  <div className='drop'>
    <div className='tabdropflex'>
        {props.drops.map((drop, index) => <div onClick={() => props.onSelectBlockChain(index, drop.label)} key={index} className={props.tabBlock == index ? "maintabs active" : "maintabs"}>
            <p className='blockname'>{drop.label}</p>
            <img className='dropselect' src={drop.imgurl}></img>
        </div>)}
    </div>

</div>
}
export default Dropdown;