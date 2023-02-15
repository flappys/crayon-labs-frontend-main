
import React, { useEffect, useState } from "react";
import './Royality.css'
import iconClose from '../../images/iconclose.png'
import { SET_PROJECT_PAYLOAD } from "../../utils/api_constants";
function Royality(props) {
    const [royaltyinput,setroyaltyinput]=useState(props.royaltyForm)
    const [rP,setRp]=useState("")
    useEffect(()=>{
        // setroyaltyinput(SET_PROJECT_PAYLOAD.royalty_percentage)
    },[])
    const onTypeProject = (e)=>{
      
        SET_PROJECT_PAYLOAD.royalty_percentage=e;
        setRp(e)
    }

    const onRoyaltyChange =(e,index)=>{
        let indexofLabel = index + 1;
        SET_PROJECT_PAYLOAD[`royalty_addr${indexofLabel}_perc`]=e;
        royaltyinput[index].labelsharevalue=e
        royaltyinput[index].labelsharevalue=e
        setroyaltyinput([...royaltyinput])
    }

    const onAddressChange = (e,index)=>{
        let indexofLabel = index + 1;
        SET_PROJECT_PAYLOAD[`royalty_addr${indexofLabel}`]=e;
        royaltyinput[index].AddressValue=e
        royaltyinput[index].RoyaltyValue=e;
        setroyaltyinput([...royaltyinput])
    }
    
    return <div className="royalty">
       <div className="fullrow">
            <div className="section-row">
                <div className="input-col">
                    <p className="addform">RoyaltyPercentage<span className="asterix">*</span></p>
                </div>
                <div className="input-col">
                    <input value={SET_PROJECT_PAYLOAD.royalty_percentage}  onChange={(e)=>onTypeProject(e.target.value)} className="formInputRoyality"></input>
                </div>
            </div>

            {royaltyinput.map((royalty,index)=><div className="formflexinput">
                <div className="royal1">
                    <p className="addform">{royalty.Address} <span className="asterix">*</span></p>
                </div>
               
                <div className="royal2">
                    <input value={royalty.RoyaltyValue}   onChange={(e)=>onAddressChange(e.target.value,index)} className="inputboxflex"></input>
                </div>
                <div className="royal3">
                    <p className="addform">{royalty.labelshare} </p>
                </div>
                <div className="royal4">
                    <input value={royalty.labelsharevalue} onChange={(e)=>onRoyaltyChange(e.target.value,index)} className="inputboxflex"></input>
                </div>
                <div className="royal5">
                {index!=0 ? <img className="iconcLOSE1" src={iconClose} onClick={props.deleteRoyalty}></img>:null}
                </div>
            </div>)}
            
        </div>
         <button className="buttonadd" disabled={props.royaltyForm.length<4?false:true} onClick={props.addMoreRoyalty}>Add More</button>
    </div>
}

export default Royality

