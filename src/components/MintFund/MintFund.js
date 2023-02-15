
import React, { useEffect, useState } from "react";
import './MintFund.css'
import iconClose from '../../images/iconclose.png'
import { SET_PROJECT_PAYLOAD } from "../../utils/api_constants";
function MintFund(props) {
    const [projectForm,setProjectForm]=useState(SET_PROJECT_PAYLOAD);
   
    const onTypeMint = (e, index) => {
        let indexofLabel = index + 1;
        let label_name_addr = "mint_fund_addr" + indexofLabel
        SET_PROJECT_PAYLOAD[label_name_addr] = e.target.value;
        props.mintForm[index].addressValue=e.target.value
        setProjectForm({...projectForm});
    }

    const onPercentage = (e, index) => {
        let indexofLabel = index + 1;
        let label_name_perc = `mint_fund_addr${indexofLabel}_perc`
        SET_PROJECT_PAYLOAD[label_name_perc] = e.target.value;
        props.mintForm[index].percentagevalue=e.target.value
        setProjectForm({...projectForm});

      
    }

    return <div>
        <div className="mintfund">
            {props.mintForm.map((form, index) => <div className="formFlex">
                <div className="subform">
                    <p className="addform">{form.addressName}<span className="asterix">*</span></p>
                    <input value={form.addressValue}  onChange={(e) => onTypeMint(e, index)} className={index != 0 ? "formInputEnable" : "formInput"}></input>
                </div>
                <div className="subform">
                    <p className="addform">{form.percentageName}<span className="asterix">*</span></p>
                    <input value={form.percentagevalue} onChange={(e) => onPercentage(e, index)} className={index != 0 ? "formInputEnable" : "formInput"}></input>
                </div>
                {index != 0 && <div className="subform" onClick={() => props.deleteRow(index)}>
                    <img className="iconcLOSE" src={iconClose}></img>
                </div>}
            </div>)}
            <button className="buttonaddMint" disabled={props.mintForm.length < 4 ? false : true} onClick={props.addMore}>Add More</button>
        </div>

    </div>
}

export default MintFund

