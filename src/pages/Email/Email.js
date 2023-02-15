
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Logoheader from "../../components/logoheader/logoheader";
import { EMAIL_VERIFY } from "../../utils/globals";
import './Email.css'
import ApiService from "../../services/apiService";
import { connect, useDispatch } from "react-redux";
import { setToast, setToastLoader,setAuth, setLoader } from "../../redux/actions/actions";

function Email(props) {
    const api = new ApiService();
    const history=useHistory()
    const dispatch = useDispatch()
    const URL = "https://api.crayonlabs.art/api/v1/resend_verify_email"

    const payload = {
        username: localStorage.getItem('email')
    }

    const onResend = ()=>{
        api.postRequest(URL, payload).then((response) => {
           console.log("resend", response.data)
            dispatch(setToastLoader("Sent Verification Email Successfully"))
        }).catch((error) => {
            props.dispatch(setToast("Network Error"));
        })
    }

    return <> <Logoheader></Logoheader>
    
    <div className="email_centerBox">
        <div className="headtopemail">
            <p className="email_title">{EMAIL_VERIFY.TITLE}</p>
        </div>

        <p className="emailIns" >we have sent a verification email<br/> to your email below</p>

        {/* <p className="emailIns" >{localStorage.getItem("email")}</p> */}

        <p className="your_email">{localStorage.getItem('email')}</p><br/>


        <button className="btn-next" onClick={() => onResend()}>Resend</button>
        
        <div className="email_div_or">
                <div className="email_borderbottom"></div>
                <p className="email_or">or</p>
                <div className="email_borderbottom2"></div>
            </div>

        <button className="email-btn-go" onClick={() => history.push("/login")}>{EMAIL_VERIFY.goback}</button>
    </div>
    </>
}

// export default Email

function mapStateToProps(state) {
    return {
        toast: state.toast
    };
}

export default connect(mapStateToProps)(Email);