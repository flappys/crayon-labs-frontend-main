
import React, { useEffect, useState } from "react";
import { SET_PROJECT_PAYLOAD } from "../../utils/api_constants";
import './WhiteList.css'
function WhiteList(props) {
    const [whitelists, setWhitelists] = useState(props.whiteList)
    const [maxmintperwallet,setmaxmintperwallet]=useState(props.mint);
    const onTypeWhiteList = (e, index, label) => {

        if (label == "discount") {
            SET_PROJECT_PAYLOAD.presale_discount_price = e.target.value;
            whitelists[index].discountPriceValue = e.target.value
        }
        else {
            SET_PROJECT_PAYLOAD.presale_launch_date = e.target.value;
            whitelists[index].preNameValue = e.target.value
        }

        setWhitelists([...whitelists]);
    }

    const onTypeMint= (e)=>{
        SET_PROJECT_PAYLOAD.presale_max_mint_limit=e.target.value;
        setmaxmintperwallet(e.target.value)
    }

    return <div> <div className="mintfund">
        {whitelists.map((form, index) => <div className="formFlex">
            <div className="subform">
                <p className="addform">{form.discountPrice}<span className="asterix">*</span></p>
                <input value={form.discountPriceValue} onChange={(e) => onTypeWhiteList(e, index, "discount")} className={index != 0 ? "formwhite" : "formwhite"}></input>
            </div>
            <div className="subform">
                <p className="addform">{form.preName}<span className="asterix">*</span></p>
                <input value={form.preNameValue} onChange={(e) => onTypeWhiteList(e, index, "launch")} className={index != 0 ? "formwhite" : "formwhite"}></input>
            </div>

        </div>)}

        <div className="Presale Form">
            <div className="formFlexmw">
                <div className="colm">
                <p className="addform">Max mint per wallet<span className="asterix">*</span></p>
                </div>
                <div className="colm">
                <input value={SET_PROJECT_PAYLOAD.presale_max_mint_limit} onChange={(e)=>onTypeMint(e)} className="formfull"></input>
                </div>
               
            </div>
        </div>

    </div> </div>
}

export default WhiteList

