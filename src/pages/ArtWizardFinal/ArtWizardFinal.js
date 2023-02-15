import React, { useEffect } from "react";
import "./ArtWizardFinal.css";
import DashboardHeader from "../../pages/Dashboard/subcomponents/header/header";
import { ART_WIZARD_FINAL } from "../../utils/globals";
import Logoheader from "../../components/logoheader/logoheader";

function ArtWizardFinal() {
  return (
    <>
    <Logoheader></Logoheader>

      <div className="wiz_final_div">
        <div className="wiz_final_content">
          <div>
            <div>
              <img className="wiz_final_img" src={ART_WIZARD_FINAL.ImgSrc} alt="" />
            </div>
            <h4 className="wiz_final_h4">{ART_WIZARD_FINAL.Scroe}</h4>
            <span className="wiz_contract">Contract: {ART_WIZARD_FINAL.Contract}</span>
            <p className="wiz_cost_p">{ART_WIZARD_FINAL.content}</p>
            <div className="wiz_count_div">
                <div>
                <img className="" src={ART_WIZARD_FINAL.plus} alt="" />

                </div>

                <div>
                    <p>1</p>
                </div>

                <div>
                <img className="" src={ART_WIZARD_FINAL.minus} alt="" />

                </div>
            </div>
            <div>
            <button className="wiz_final_btn">{ART_WIZARD_FINAL.button}</button>
            </div> 
          </div>
        </div>
      </div>
    </>
  );
}

export default ArtWizardFinal;
