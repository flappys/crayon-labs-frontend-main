import React, { useEffect } from "react";
import './Launches.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { responsive } from "../../../utils/globals";
function Launches(props) {
    useEffect(() => {
        // console.log(props)
    }, [])

   
    return <>
        <div className="text-center-launches">
            <p className="titlelaunches">{props.data.MAIN_TITLE}</p>
            <p className="titlelaunchsub">{props.data.SUBTITLE}</p>
        </div>


        {props.data.card.length!=0 && <Carousel itemClass="test"   showDots={false} swipeable={true} responsive={responsive}  infinite={true} autoPlay={true}>
            {props.data.card.map((info) =>

                <div className="col" key={info.imgurl}>
                    <img alt="slide" className="avatar" src={info.imgurl}></img>
                    <p className="launchname">{info.name}</p>
                    <div className="sub_launch_content">
                        <div className="subcol1"><p className="supply">{info.f1}</p></div>
                        <div className="subcol"> <div className="box">{info.f2}</div></div>
                    </div>
                </div>


            )}
        </Carousel>}



    </>
}

export default Launches

