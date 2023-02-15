
import React, { useEffect } from "react";
import { PRICE_CONTENT } from "../../../utils/globals";
import './PRICE.css'
function PRICE() {
    useEffect(() => {

    }, [])

    return <div className="pricecontent">
        <div className="priceTitle">
            {PRICE_CONTENT.MAIN_TITLE}
        </div>

        <div className="priceflex">
            {PRICE_CONTENT.card.map((price) => 
            <div className="priceCard" key={price.name}>
                <div className="pricecontentTop">
                    {price.name}
                </div>
                <div className="pricecontentBottom">
                    <p className="priceCount">{price.count} </p>
                    <p className="priceSub">{price.sub}</p>
                </div>
            
                <div className="priceFoot">
                  <p className="pricefootsub"> {price.subcontent} </p>
                </div>
            </div>
            )}
        </div>
    </div>
}

export default PRICE

