import React, { useEffect } from "react";
import "./Sentemail.css";
import { EMAIL_SENT } from "../../utils/globals";
import { useHistory } from "react-router-dom";
import DashboardHeader from "../../../src/pages/Dashboard/subcomponents/header/header";
import Logoheader from "../../components/logoheader/logoheader";

// const history = useHistory();

function Sentemail() {
  return (
    <>
  <Logoheader></Logoheader>
      <div className="sent_email_container">
        <div className="head_sent_email">
          <p className="SentP">{EMAIL_SENT.TITLE}</p>
        </div>
        <div className="mail_icon_div">
          <img alt="slide" className="" src={EMAIL_SENT.icon} />
        </div>
        <p className="email_contents" style={{ fontSize: "20px" }}>
          {EMAIL_SENT.SUBTITLE}
        </p>

        <p className="email_contents" style={{ fontSize: "20px" }}>
          {localStorage.getItem("email")}
        </p>

        <p className="your_email">email@gmail.com</p>
        <br />

        <button className="btn-go">{EMAIL_SENT.goback}</button>
      </div>
    </>
  );
}

export default Sentemail;
