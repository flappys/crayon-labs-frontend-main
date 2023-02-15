import './App.css';
import React,{useEffect,useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './pages/home/home';
import Login from './pages/login/Login';
import Registration from './pages/Registration/Registration';
import Forgot from './pages/Forgot/Forgot';
import ResetPwd from './pages/ResetPwd/ResetPwd';
import Email from './pages/Email/Email';
import Dashboard from './pages/Dashboard/Dashboard';
import Toast from './components/Toast/Toast';
import UploadNFTData from './pages/UploadNFTData/UploadNFTData';
import CustomNft from './pages/CustomNft/CustomNft';
import ModalPage from './components/ModalPage/ModalPage';
import Support from './pages/Support/Support';
import WhitelistProjects from './pages/WhitelistProjects/WhitelistProjects';
import Sentemail from './pages/Sentemail/Sentemail';
import ArtWizardFinal from './pages/ArtWizardFinal/ArtWizardFinal';
import ArtWizardMain from './pages/ArtWizardMain/ArtWizardMain';
import CreateProject from './pages/createproject/createproject';
import Myprojects from './pages/myprojects/myprojects';
import UpdateProject from './pages/updateProject/updateProject';
import NFT_Home from './pages/CustomNftHome/CustomNftHome';
import GuardedRoute from './protectesRoutes';
import ArtHome from './pages/ArtWizardMain/ArtProjects';
import {GET_USER} from './utils/api_constants'
import ApiService from "./services/apiService";
import { connect, useDispatch } from "react-redux";
import {setAuth } from './redux/actions/actions';
import Loader from './components/Loader/loader';
import EmailVerify from './pages/Email verify/EmailVerify';
function App(props) {


  const [checkUser,setUser]=useState(false)

  const api=new ApiService()

  const dispatch=useDispatch()
  useEffect(()=>{
    // if(!props.isAuth){
    //   let payload={
    //     user_id:localStorage.getItem("id")
    //   }
    //   api.postRequest(GET_USER,payload).then((res)=>{
    //     dispatch(setAuth(true))
    //   }).catch((error)=>{
    //     dispatch(setAuth(false))

        
    //   })
    // }


    dispatch(setAuth(localStorage.getItem("token")!=null))

  },[props.isAuth])

  return (
    <>

      <Router>
        <Toast></Toast>
        <ModalPage></ModalPage>
          <Loader></Loader>
        <Switch>


          <Route path="/" exact component={Home}></Route>
          <Route path="/Dashboard" exact component={Dashboard}  ></Route>
          <Route path='/forgot' component={Forgot} ></Route>
          <Route path='/reset_password/:token' component={ResetPwd} ></Route>
          <Route path='/email_verify' component={Email} ></Route>
          <Route path='/verify/:token' component={EmailVerify} ></Route>
          <Route path='/my_projects' component={Myprojects} ></Route>
          <Route path="/login" exact component={Login} ></Route>
          <Route path="/register" exact component={Registration} ></Route>
          <Route path='/create_project' component={CreateProject} ></Route>
          <Route path='/upload_nft/:id' component={UploadNFTData} ></Route>
          <Route path='/custom_nft/:id' component={CustomNft} ></Route>
          <Route path='/support' component={Support} ></Route>
          <Route path='/support' component={Support} ></Route>
          <Route path='/whitelist_projects' component={WhitelistProjects} ></Route>
          <Route path='/whitelist_project/:id' component={WhitelistProjects} ></Route>
          <Route path="/sent_email" exact component={Sentemail} ></Route>
          <Route path='/art_wizard-final' component={ArtWizardFinal} ></Route>
          <Route path='/art_wizard/:id' component={ArtWizardMain} ></Route>
          <Route path='/art_wizard_home' component={ArtHome} ></Route>
          <Route path='/nft_home' component={NFT_Home} ></Route>
          <Route path='/project_details/:id' component={UpdateProject} ></Route>
        </Switch>
      </Router>

    </>
  );
}

function mapStateToProps(state) {
  return {
    isAuth: state.isAuth
  };
}

export default connect(mapStateToProps)(App);
