
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Logoheader from "../../components/logoheader/logoheader";
import { setToast, setToastLoader } from "../../redux/actions/actions";
import apiService from "../../services/apiService";
import { FORGOT } from "../../utils/globals";
import './Forgot.css'

function Forgot(props) {
    const api = new apiService()
    const history = useHistory()
    const dispatch = useDispatch()
    const [email, setemailVal] = useState("")
    const [sentMail, setSentMail] = useState("")
    const setEmail = (email, index) => {
        FORGOT.input[index].value = email;
        setemailVal(email);
        localStorage.setItem("email", email);
    }
    const onSubmit = () => {
        if (FORGOT.input[0].regex.test(FORGOT.input[0].value) && email.length != 0) {

            const URL = "https://api.crayonlabs.art/api/v1/send_reset_password_email";
            const payload = {
              username: email,
            };

            api
            .postRequest(URL, payload)
            .then((response) => {
                setSentMail(true);
              dispatch(setToastLoader("Reset Password Request sent to you Email"));
            })
            .catch((error) => {
                setSentMail(false);
              props.dispatch(setToast("Network Error"));
            });
        }
        else {
                setSentMail(false);
                dispatch(setToast("Enter correct email ID"))
        }

    }

    const createToken = (id) => {
        api.createForgotToken(id).then((response) => {
            if (response.data.message == "Email Sent Successfully") {
                history.push("/emailverify")
            }
        }).catch((error) => {
            dispatch(setToast(error.response.data.message))
        })
    }
    return <>
        <Logoheader></Logoheader>
        <div className="centerBox">

            <div className="headtopforgot">
                <p className="forgotP">{FORGOT.TITLE}</p>
            </div>

            <p className="emailIns">{FORGOT.SUBTITLE}</p>

            <div className="formSignup">
                {FORGOT.input.map((forms, index) =>
                    <>
                        <div className="inputlabel">
                            <p>{forms.name}</p>
                        </div>

                        <input value={email} placeholder={forms.placeholder} onChange={(e) => setEmail(e.target.value, index)} className={forms.className}></input>



                    </>
                )}
            </div>
            <div className="space1"></div>
            <button className="btn-sentmail" onClick={() => onSubmit()}>{FORGOT.buttoname}</button>

            <div className="div_or">
                <div className="borderbottom"></div>
                <p className="or">or</p>
                <div className="borderbottom2"></div>
            </div>

            <div className="space3"></div>

            <button className="btn-go" onClick={() => history.push("/login")}>{FORGOT.goback}</button>
        </div>
    </>
}

function mapStateToProps(state) {
    return {
        toast: state.toast
    };
}

export default connect(mapStateToProps)(Forgot);

