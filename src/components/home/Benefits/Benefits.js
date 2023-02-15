
import React, { useEffect } from "react";
import { BENEFITS, responsive } from "../../../utils/globals";
import Carousel from "react-multi-carousel";
import './Benefits.css'
function Benefits() {
    useEffect(() => {

    }, [])
    return <div className="centercard">
        <div className="text-center-benefit">
            <p className="titlebenefits">The <span className="benefits"> benefits </span> that you will actually get on our site</p>
        </div>
        <div className="text-center">
            
            <div className="benefitFlex">
                {BENEFITS.card.map((x) =>
                    <div className="benefitCard" style={{backgroundColor:x.color}} key={x.name}>
                      
                        <img className="icon" alt="slide" src={x.imgURL}></img>
                       
                        <p className="artname">{x.name}</p>
                        <p className="subname">{x.sub}</p>
                    </div>
                )}
            </div>
        
           
            <div className="carouselmob">
            <Carousel className="carouselmob"  swipeable={true} responsive={responsive} arrows={false} showDots={true}>
                {BENEFITS.card.map((x) =>
                    <div className="benefitCard" key={x.imgURL} style={{ backgroundColor: x.color }}>
                        
                            <img className="icon" alt="slide" src={x.imgURL}></img>
                      

                        <p className="artname">{x.name}</p>
                        <p className="subname">{x.sub}</p>
                    </div>
                )}
            </Carousel>
            </div>
           
        </div>
    </div>
}

export default Benefits

