
import React, { useEffect } from "react";
import { useDispatch,connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { setToast } from "../../redux/actions/actions";
import ApiService from "../../services/apiService";
import { GET_PROJECTS_ROUTE, GET_PROJECT_PAYLOAD } from "../../utils/api_constants";
import { BREAD_CRUMD_DATA, dashboardcards } from "../../utils/globals";
import './Dashboard.css'
import DashboardHeader from './subcomponents/header/header'
function Dashboard(props) {
    const api = new ApiService()
    const dispatch = useDispatch()
    useEffect(() => {
        if (!props.isAuth) {
            history.push("/login")
        }
    }, [props.isAuth])
    const history = useHistory();

    const createProject = () => { 
        history.push("/create_project")
        // console.log("inner");
      }
      
    const goToPage = (x) => {
        history.push(x.route)
    }

    return <div className="dashboardmain">
        <DashboardHeader DATA={BREAD_CRUMD_DATA.DASHBOARD}></DashboardHeader>
        <div className='projectexists'>
          <div className='create_project_btn'>
          <div className='project_btn' onClick={() => createProject()}>
                        <p>Create Project</p>
                    </div>
          </div>
          </div>
        <div className="center">
            <div className="cardboardflex">
                {dashboardcards.data.map((x) => <div key={x.title} onClick={() => goToPage(x)} className={x.className}>
                    <div className="circle">
                        <img className="dashboard_icons" src={x.imgIcon} />
                    </div>
                    <p className="cardboardtitle">{x.title}</p>
                    <p className="cardboardsubtitle">{x.subtitle}</p>
                </div>)}


            </div>
        </div>

    </div>
}

function mapStateToProps(state) {
    return {
      isAuth: state.isAuth
    };
  }
  
  export default connect(mapStateToProps)(Dashboard);
  

