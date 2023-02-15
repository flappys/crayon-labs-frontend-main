
import React, { useEffect } from "react";
import { FOOTER } from "../../utils/globals";
import './Footer.css'
function Footer() {
    useEffect(() => {

    }, [])
    return <>  <div className="footer">
        <div className="text-bottom">
            <p className="footerTitle"> {FOOTER.MAIN_TITLE} </p>
        </div>
        <div className="footerFlex">
            <div className="footer-col">
                {FOOTER.card.map((footer) =>
                    <div className="footerinnerFlex" key={footer.name}>
                        <div><img alt="slide" className="foot_image" src={footer.imgurl}></img></div>
                        <div><p className="foot_name">{footer.name}</p></div>
                    </div>

                )}
            </div>

            <div className="footer-col">
                <img alt="slide" src={FOOTER.sideImage} className="itemSide"></img>
            </div>
        </div>

    </div>
    </>
}

export default Footer

