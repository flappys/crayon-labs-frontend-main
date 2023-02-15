import React, { useEffect, useState } from "react";
import { FORGOT, RESET_PWD } from "../../utils/globals";
import "./ResetPwd.css";
import { useHistory, useParams } from "react-router-dom";
import ApiService from "../../services/apiService";
import Logoheader from "../../components/logoheader/logoheader";
import { connect, useDispatch } from "react-redux";
import {
  setToast,
  setToastLoader,
  setAuth,
  setLoader,
} from "../../redux/actions/actions";

function ResetPwd(props) {
  const params = useParams();
  const dispatch = useDispatch();
  const api = new ApiService();
  const history = useHistory();
  const [verified, setVerified] = useState("");

  const onChange = (value, index) => {
    RESET_PWD.input[index].value = value;
  };

  const onSubmit = () => {
    if (RESET_PWD.input[0].value == RESET_PWD.input[1].value) {
         let token = params.token;
    console.log("token   ", token);
    const URL = "https://api.crayonlabs.art/api/v1/reset_password/" + token;

    let payload = {
        password : RESET_PWD.input[0].value,
        confirm_password : RESET_PWD.input[1].value,
    }

    api
    .postRequest(URL, payload)
      .then((response) => {
        dispatch(setToastLoader("Updated Password Successfully"));
        history.push("/login")
      })
      .catch((error) => {
        console.log("response error", error);
        setVerified(false);
        props.dispatch(setToast("Server Error"));
      });
    }
  };

  return (
    <>
      <Logoheader></Logoheader>
      <div className="centerBox">
            <div className="headtopforgot">
              <p className="rs_forgotP">{RESET_PWD.TITLE}</p>
            </div>
            <div className="formSignup">
              {RESET_PWD.input.map((forms, index) => (
                <>
                  <div className="inputlabel">
                    <p>{forms.name}</p>
                  </div>

                  <input
                    type='password' onChange={(e) => onChange(e.target.value, index)}
                    className={forms.className}
                  ></input>
                </>
              ))}
            </div>
            <button className="btn-reset" onClick={() => onSubmit()}>
              {RESET_PWD.buttoname}
            </button>
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    toast: state.toast,
  };
}

export default connect(mapStateToProps)(ResetPwd);
