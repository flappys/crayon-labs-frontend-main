
import { useState } from 'react';
import GoogleOneTapLogin from 'react-google-one-tap-login';
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

function LoginHooks(props) {
    const history = useHistory();
    const api = new ApiService();

    const clientId = "1021541528693-mmmtmu8tblje83ciim9ml3t4pf0b6qm5.apps.googleusercontent.com"

    const [showGoogleAuth, setShowGoogleAuth] = useState(false)

    const setResponse=(response)=>{
        setShowGoogleAuth(false)
        console.log("🚩 ~ file: google-auth.js ~ line 28 ~ setResponse ~ response", response)

        let payload = {
            username: response.email,
            sub: response.sub,
          };

          props.dispatch(setLoader(true));
          api
            .postRequest(LOGIN_ROUTE, payload)
            .then((response) => {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem(
                  "id",
                  api.parseJwt(localStorage.getItem("token")).id
                );
                props.dispatch(setLoader(false));
                props.dispatch(setAuth(true));
                history.push("/dashboard");
              
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
    }


    return <div>
        {showGoogleAuth && <GoogleOneTapLogin onError={(error) => console.log(error)} onSuccess={(response) =>setResponse(response)} googleAccountConfigs={{ client_id: clientId }} />},
        <button type="button" onClick={() => setShowGoogleAuth(true)} className="login-with-google-btn">
            Continue with Google
        </button>
    </div> 
}


function mapStateToProps(state) {
    return {
      toast: state.toast,
    };
  }
  
  export default connect(mapStateToProps)(LoginHooks);