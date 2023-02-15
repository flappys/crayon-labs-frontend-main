import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { BREAD_CRUMD_DATA } from "../../utils/globals"
import DashboardHeader from "../Dashboard/subcomponents/header/header"
import ProjectComponent from "./project"
import { connect } from 'react-redux';
function CreateProject(props) {
  const history=useHistory()
  useEffect(() => {
    if (!props.isAuth) {
        history.push("/login")
    }
}, [props])
  return <div>   <DashboardHeader
    DATA={BREAD_CRUMD_DATA.PROJECTS_CREATE}
  ></DashboardHeader><ProjectComponent flag="create" title="Add Project" ></ProjectComponent></div>
}
function mapStateToProps(state) {
  return {
      isAuth:state.isAuth
  };
}

export default connect(mapStateToProps)(CreateProject);