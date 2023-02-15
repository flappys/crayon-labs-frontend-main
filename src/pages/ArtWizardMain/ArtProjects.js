import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ApiService from "../../services/apiService";
import { GET_PROJECTS_ROUTE, GET_PROJECT_PAYLOAD } from "../../utils/api_constants";
import { BREAD_CRUMD_DATA } from "../../utils/globals";
import DashboardHeader from "../Dashboard/subcomponents/header/header";
import { connect } from 'react-redux';
import { setLoader } from "../../redux/actions/actions";

function ArtHome(props) {
    const [projects, setProjects] = useState([])
    const api = new ApiService()
    const history=useHistory()

    useEffect(() => {
        console.log(props)
        if (!props.isAuth) {
            history.push("/login")
        }
    }, [props])

    const createProject = () => {
        history.push("/create_project")
    
    }
    useEffect(() => {
        props.dispatch(setLoader(true))
        GET_PROJECT_PAYLOAD.user_id = localStorage.getItem("id")
        api.postRequest(GET_PROJECTS_ROUTE, GET_PROJECT_PAYLOAD).then((response) => {
            setProjects(response.data);
            props.dispatch(setLoader(false))
        }).catch((error) => {
            console.log(error)
            props.dispatch(setLoader(false))
        })
    }, [])
    return <div>
        <DashboardHeader DATA={BREAD_CRUMD_DATA.PROJECTS}></DashboardHeader>
        {projects.length != 0 ? <div className="center">
            {projects.map((pro) => <div className="projectbox" onClick={()=>history.push("/art_wizard/" + pro.id)}>
                <p>Project Name : {pro.project_name}</p>
            </div>)}
        </div>:
             props.isLoader==false && <div className='no_projects'>
                <p className='maindata'>Looks like you haven't created any Project</p>

                <p className='maindata2'>Click the below button to get started</p>

                <div className='text_button_center' onClick={()=>createProject()}>
                    <p>Create Project</p>
                </div>
            </div>
            
            }
    </div>
}


function mapStateToProps(state) {
    return {
        isAuth:state.isAuth,
        isLoader:state.isLoader
    };
}

export default connect(mapStateToProps)(ArtHome);