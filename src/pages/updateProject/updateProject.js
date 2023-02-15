import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { BREAD_CRUMD_DATA } from '../../utils/globals'
import ProjectComponent from '../createproject/project'
import DashboardHeader from '../Dashboard/subcomponents/header/header'
import { connect } from 'react-redux';
import './updateProject.css'
function UpdateProject(props) {
  useEffect(() => {
    if (!props.isAuth) {
        history.push("/login")
    }
}, [props])
  const history=useHistory()
    return <div>   <DashboardHeader
    DATA={BREAD_CRUMD_DATA.UPDATE}
  ></DashboardHeader><ProjectComponent title="Edit Project" flag="edit"></ProjectComponent></div>
}


function mapStateToProps(state) {
  return {
      isAuth:state.isAuth
  };
}

export default connect(mapStateToProps)(UpdateProject);