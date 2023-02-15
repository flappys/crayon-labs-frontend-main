import React, { useEffect, useState } from "react";
import { HEADER_MENU, SIGNUPFORM } from "../../utils/globals";
import { REGISTER_PAYLOAD, REGISTER_ROUTE } from "../../utils/api_constants";
import "./Registration.css";
import { useHistory } from "react-router-dom";
import ApiService from "../../services/apiService";
import { connect, useDispatch } from "react-redux";
import {
  setToast,
  setToastLoader,
  setAuth,
  setLoader,
} from "../../redux/actions/actions";
import line from "../../images/Line.svg";

function Registration(props) {
  const history = useHistory();
  const api = new ApiService();
  const [signup, setSignUp] = useState(SIGNUPFORM.input);
  const dispatch = useDispatch();

  const onSubmitP = () => {
    if (signup[0].valid && signup[1].valid) {
      props.dispatch(setLoader(true));
      REGISTER_PAYLOAD.email = signup[0].value;
      REGISTER_PAYLOAD.password = signup[1].value;
      api
        .postRequest(REGISTER_ROUTE, REGISTER_PAYLOAD)
        .then((response) => {
          console.log("register", response.data);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem(
            "id",
            api.parseJwt(localStorage.getItem("token")).id
          );
          dispatch(setToastLoader("Registration Success"));
          // props.dispatch(setAuth(true))
          localStorage.setItem("email", signup[0]?.value);
          props.dispatch(setLoader(false));
          history.push("/email_verify");
          // history.push("/dashboard")
          // props.dispatch(setLoader(false))
        })
        .catch((error) => {
          props.dispatch(setLoader(false));
          if (error.message == "Network Error") {
            props.dispatch(setToast("Network Error"));
          } else {
            props.dispatch(setToast("Server Error"));
          }
        });
    } else {
      dispatch(setToast("make sure email ID and password is valid"));
    }
  };

  const checkInput = (value, index) => {
    signup[index].value = value;
    if (value.length != 0) {
      signup[index].startTyping = true;
    } else {
      signup[index].startTyping = false;
    }
    checkvalid(signup[index].value, signup[index].regex, index);
  };

  const checkvalid = (value, regex, index) => {
    if (regex.test(value)) {
      signup[index].valid = true;
    } else {
      signup[index].valid = false;
    }
    setSignUp([...signup]);
  };
  return (
    <div className="containerlogin">
      <div className="loginFlex">
        <div className="flexMain">
          <div className="loginbg">
            <div className="">
              <div className="image-logo">
                <img src={HEADER_MENU.logoIcon}></img>
              </div>
              <div className="textcontent_signup">
                <p className="subtop"> {SIGNUPFORM.toptitle}</p>
                <p className="submid" onClick={() => history.push("/login")}>
                  {" "}
                  {SIGNUPFORM.subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flexMain">
          <div className="headtop">
            <p className="headersign">{SIGNUPFORM.innertitle}</p>
            <p className="headerbottom">{SIGNUPFORM.mint}</p>
          </div>

          <div className="formSignup">
            {signup.map((forms, index) => (
              <>
                <div className="reg_inputlabel">
                  <p>{forms.name}</p>
                </div>

                <input
                  placeholder={forms.placeholder}
                  type={forms.name != "Set Password" ? "text" : "password"}
                  onChange={(e) => checkInput(e.target.value, index)}
                  className={forms.className}
                ></input>
                {forms.startTyping == true && forms.valid == false && (
                  <p className="validationerror">{forms.errorMessage}</p>
                )}
              </>
            ))}
            <br></br> <br></br>
            <button className="btn-signregister" onClick={() => onSubmitP()}>
              {SIGNUPFORM.buttoname}
            </button>
            <div className="reg_buttonloginflex">
              <img className="hr_line" src={line} />
              <p className="or">or</p>
              <img className="hr_line" src={line} />
            </div>
            <div className="">
              <button type="button" className="reg_login-with-google-btn">
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    toast: state.toast,
  };
}

export default connect(mapStateToProps)(Registration);
