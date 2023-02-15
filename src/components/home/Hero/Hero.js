
import React, { useEffect } from "react";
import { HERO_CONTENT } from "../../../utils/globals";
import {Link} from 'react-router-dom';
 
import './Hero.css'
function Hero() {
    useEffect(() => {

    }, [])
    return <div className="center">
        <div className="content-hero">
            <div className="col1">
                <div className="innerContainer">



                    <div className="maintitle">
                        <p className="heroTitle">{HERO_CONTENT.contentHead}</p>
                    </div>

                    <div className="innerContent">
                        <div className="col-inner1">
                            <img alt="slide" src={HERO_CONTENT.lineIcon}></img>
                        </div>
                        <div className="col-inner2">
                          <p className="NFT">{HERO_CONTENT.foot}</p>
                        </div>
                    </div>


                    <div className="sub">
                        <p className="subtitle">Launch your NFT projects with ease. A No Code launcher platform for artists and designers.</p>
                    </div>

                    <div className="button_fab_flex">
                        <div className="col_but">
                            
                            <Link className="free" to="/login">
                            <div className="Free">
                            <p className="free"> Get started for FREE </p> 
                            </div>
                            </Link>

                        </div>
                       
                    </div>
                </div>

            </div>
            <div className="col2">
                <img alt="slide" className="iconHero" src={HERO_CONTENT.heroIcon}></img>
            </div>
            <br></br>
        </div>

    </div>
}

export default Hero

