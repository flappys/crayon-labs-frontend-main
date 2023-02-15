import React, { useEffect } from "react";
import "./CreatePassword.css";
import { CREATE_PASSWORD } from "../../utils/globals";
import { useHistory } from "react-router-dom";
import DashboardHeader from "../../../src/pages/Dashboard/subcomponents/header/header";

function CreatePassword() {
  useEffect(() => {}, []);
  return (
    <>
      <DashboardHeader />

      <div className="create_pass_container">
        <div className="head_sent_email">
          <p className="forgotP">{CREATE_PASSWORD.TITLE}</p>
        </div>
        <div className="form_create_pass">
          <div className="">
            <p>New password</p>
          </div>
          <input type="password" className="inputs" />

          <div className="">
            <p>Confirm password</p>
          </div>
          <input type="password" className="inputs" />
        </div>

        <div className="create_pass_btn_div">
          <button className="create_pass_btn">
            {CREATE_PASSWORD.button_text}
          </button>
        </div>
      </div>
    </>
  );
}

export default CreatePassword;
