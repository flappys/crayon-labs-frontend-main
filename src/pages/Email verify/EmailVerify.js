import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Logoheader from "../../components/logoheader/logoheader";
import { EMAIL_VERIFY } from "../../utils/globals";
import "./EmailVerify.css";
import ApiService from "../../services/apiService";
import { connect, useDispatch } from "react-redux";
import {
  setToast,
  setToastLoader,
  setAuth,
  setLoader,
} from "../../redux/actions/actions";

function VerifyEmail(props) {
  const api = new ApiService();
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [verified, setVerified] = useState(false);

  const URL = "https://api.crayonlabs.art/api/v1/resend_verify_email";
  const payload = {
    username: localStorage.getItem("email"),
  };

  const onResend = () => {
    api
      .postRequest(URL, payload)
      .then((response) => {
        console.log("resend", response.data);
        dispatch(setToastLoader("Sent Verification Email Successfully"));
      })
      .catch((error) => {
        props.dispatch(setToast("Network Error"));
      });
  };

  useEffect(() => {
    let token = params.token;
    const URL = "https://api.crayonlabs.art/api/v1/verify/" + token;

    api
      .getRequest(URL)
      .then((response) => {
        setVerified(true);
        dispatch(setToastLoader("Email Verified Successfully"))
      })
      .catch((error) => {
        console.log("response error",error);
        setVerified(false);
        props.dispatch(setToast("Network Error"));
      });
  }, []);

  return (
    <>
      {" "}
      <Logoheader></Logoheader>
      {verified == true && (
        <div className="verify_succes_box">
          <div className="headtopemail">
            <p className="email_title">Email Verify</p>
          </div>

          <p className="login_succes_txt">
            Email Verified Successfully
            <br />
            Now You can Login
          </p>
          <button
            className="login_btn_success"
            onClick={() => history.push("/login")}
          >
            {EMAIL_VERIFY.goback}
          </button>
        </div>
      )}
      {verified == false && (
        <div className="email_centerBox">
          <div className="headtopemail">
            <p className="email_title">Email Verify</p>
          </div>

          <p className="emailIns">
            Email not verified
            <br /> Click on Resend below
          </p>

          <p className="your_email">{localStorage.getItem("email")}</p>
          <br />

          <button className="btn-next" onClick={() => onResend()}>
            Resend
          </button>

          <div className="email_div_or">
            <div className="email_borderbottom"></div>
            <p className="email_or">or</p>
            <div className="email_borderbottom2"></div>
          </div>

          <button
            className="email-btn-go"
            onClick={() => history.push("/login")}
          >
            {EMAIL_VERIFY.goback}
          </button>
        </div>
      )}
    </>
  );
}

// export default Email

function mapStateToProps(state) {
  return {
    toast: state.toast,
  };
}

export default connect(mapStateToProps)(VerifyEmail);
