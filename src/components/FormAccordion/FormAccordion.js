
import React, { useEffect, useState } from "react";
import './FormAccordion.css'

import { FAQ_CONTENT } from "../../utils/globals";
import MintFund from "../MintFund/MintFund";
import WhiteList from "../WhiteList/WhiteList";
import Royality from "../Royality/Royality";
import { SET_PROJECT_PAYLOAD } from "../../utils/api_constants";
function FormAccordion(props) {
    useEffect(() => {
       console.log(SET_PROJECT_PAYLOAD)
    }, [])
    const [input, setInputs] = useState(props.input.DATA)


    //WHITELIST DATA
    const [whiteList, setWhitelist] = useState([
        { discountPrice: "discountPrice", discountPriceValue: "", preName: "launch date", preNameValue: "" },

    ])
    
    //MINT FUND DATA 
    const [mintForm, setMintForm] = useState([
        { addressName: "Address", addressValue: "", percentageName: "percentage", percentagevalue: "" },

    ])


        // ROYALITY
    const [royaltyForm, setRoyality] = useState(
        [
            { Address: "Address", place: "5%", AddressValue: "",labelshare:"Royality Share" ,labelsharevalue:"",Royalitylabel:"RoyaltyPercentage",RoyaltyValue:"" }
        ]
    )

    const deleteRow = (index) => {
        mintForm.splice(index, 1)
        setMintForm([...mintForm]);
    }

    const addMore = () => {
        console.log("inner")
        let data = { addressName: "Address", addressValue: "", percentageName: "percentage", percentagevalue: "" }
        mintForm.push(data)
        console.log(mintForm)
        setMintForm([...mintForm]);
    }

    const deleteRoyalty = (index) => {
        console.log(index)
        royaltyForm.splice(index, 1)
        setRoyality([...royaltyForm]);
    }

    const addMoreRoyalty = () => {
        let data =    { Address: "Address", place: "5%", AddressValue: "",labelshare:"Royality Share" ,labelsharevalue:"",Royalitylabel:"RoyaltyPercentage",RoyaltyValue:"" }
        royaltyForm.push(data)
        setRoyality([...royaltyForm]);
    }
    const toggleAccordion = (id, action) => {

        let index = input.findIndex((x) => x.accordion_id === id)

        if (action === "down") {
            input[index].accordion_trigger = false

        }
        else {
            input.map((acc) => {
                acc.accordion_trigger = false
                return acc;
            })
            input[index].accordion_trigger = true

        }
        setInputs([...input]);
    }
    return input.map((acc, index) =>
        <div className="accordionBoxForm">
            <div className="accordiontitle">
                <div className="accordionflex">
                    <div className="accordioncol1">
                        <div className="accordionnew">
                            <p className="titleformaccordion">{acc.title} </p>
                        </div>

                        {acc.accordion_trigger && <div className="answer">
                            {acc.componentName == "MintFund" && <div>
                                <MintFund mintForm={mintForm} addMore={addMore} deleteRow={deleteRow}></MintFund>
                            </div>}
                            {acc.componentName == "WhiteList" && <div>
                                <WhiteList whiteList={whiteList}></WhiteList>
                            </div>}
                            {acc.componentName == "Royality" && <div>
                                <Royality royaltyForm={royaltyForm} addMoreRoyalty={addMoreRoyalty} deleteRoyalty={deleteRoyalty}></Royality>
                            </div>}
                        </div>}


                    </div>
                    <div className="accordioncol1">
                        {acc.accordion_trigger ? <img alt="slide" onClick={() => toggleAccordion(acc.accordion_id, "down")} className="Icon1" src={FAQ_CONTENT.accordionToggleUp}></img> : <img alt="slide" onClick={() => toggleAccordion(acc.accordion_id, "up")} className="Icon1" src={FAQ_CONTENT.accordionToggleDown}></img>}
                    </div>
                </div>
            </div>

        </div>)

}

export default FormAccordion;