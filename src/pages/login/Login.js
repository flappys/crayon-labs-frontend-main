import React, { useEffect, useState } from "react";
import { HEADER_MENU, LOGINFORM } from "../../utils/globals";
import "./Login.css";
import { useHistory } from "react-router-dom";
import ApiService from "../../services/apiService";
import { connect } from "react-redux";
import line from "../../images/Line.svg";

import {
  setToast,
  setToastLoader,
  setToastLoader_false,
  setAuth,
  setLoader,
} from "../../redux/actions/actions";
import { LOGIN_ROUTE } from "../../utils/api_constants";
import LoginHooks from "../../components/react-google-auth/google-auth";
function Login(props) {
  const history = useHistory();
  const api = new ApiService();
  const [loginForm, setLoginForm] = useState(LOGINFORM.input);
  useEffect(() => {
    loginForm[0].startTyping = false;
    loginForm[1].startTyping = false;
  }, []);

  const checkInput = (value, index) => {
    loginForm[index].value = value;
    if (value.length != 0) {
      loginForm[index].startTyping = true;
    } else {
      loginForm[index].startTyping = false;
    }
    checkvalid(loginForm[index].value, loginForm[index].regex, index);
  };

  const checkvalid = (value, regex, index) => {
    // if (regex.test(value)) {
    //   loginForm[index].valid = true;
    // } else {
    //   loginForm[index].valid = false;
    // }
    loginForm[index].valid = true;
    setLoginForm([...loginForm]);
  };
  const onSubmitP = () => {
    if (loginForm[0].valid && loginForm[1].valid) {
      let payload = {
        email: loginForm[0].value,
        password: loginForm[1].value,
      };
      props.dispatch(setLoader(true));
      api
        .postRequest(LOGIN_ROUTE, payload)
        .then((response) => {
          console.log("login", response.data);
          console.log("login", loginForm[0]?.value);

          if (response.data.user.email_verified == false) {
            localStorage.setItem("email", loginForm[0]?.value);
            props.dispatch(setLoader(false));
            history.replace("/email_verify");
          } else {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem(
              "id",
              api.parseJwt(localStorage.getItem("token")).id
            );
            props.dispatch(setLoader(false));
            props.dispatch(setAuth(true));
            history.push("/dashboard");
          }
        })
        .catch((error) => {
          props.dispatch(setLoader(false));
          if (error.message == "Network Error") {
            props.dispatch(setToast("Network Error"));
          } else {
            if (error.response.status == 401) {
              props.dispatch(setToast("Credentials Doesn't Match"));
            } else {
              props.dispatch(setToast("Server Error"));
            }
          }
        });
    } else {
      props.dispatch(setToast("Username or password is not entered"));
    }
  };
  return (
    <div className="containerlogin">
      <div className="loginFlex">
        <div className="flexMain">
          <div className="headtop">
            <p className="headersign">{LOGINFORM.toptitle}</p>
            <p className="headerbottom">{LOGINFORM.subtitle}</p>
          </div>

          <div className="formSignup">
            {loginForm.map((forms, index) => (
              <>
                <div className="inputlabel">
                  <p>{forms.name}</p>
                </div>

                <input
                  placeholder={forms.placeholder}
                  type={forms.name != "Password" ? "text" : "password"}
                  onChange={(e) => checkInput(e.target.value, index)}
                  className={forms.className}
                ></input>
                {/* {forms.startTyping == true && forms.valid == false && (
                  <p className="validationerror">{forms.errorMessage}</p>
                )} */}
              </>
            ))}
            <br></br> <br></br>
            <div className="buttonloginflex">
              <button className="btn-signup" onClick={() => onSubmitP()}>
                {LOGINFORM.buttoname}
              </button>
              <p className="forgot" onClick={() => history.push("/forgot")}>
                Forgot Password ?
              </p>
            </div>
            <div className="buttonloginflex">
              <img className="hr_line" src={line} />
              <p className="or">or</p>
              <img className="hr_line" src={line} />
            </div>
            <div className="">
              <LoginHooks></LoginHooks>
            </div>
          </div>
        </div>
        <div className="flexMain">
          <div className="loginbg">
            <div className="">
              <div className="image-center">
                <img src={HEADER_MENU.logoIcon} />
              </div>
              <div className="textcontent">
                <p className="subtop">{LOGINFORM.innertitle}</p>
                <p className="submid" onClick={() => history.push("/register")}>
                  {" "}
                  {LOGINFORM.mint}
                </p>
              </div>
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

export default connect(mapStateToProps)(Login);
