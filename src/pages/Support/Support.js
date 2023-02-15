
import React, { useEffect, useState } from "react";
import './Support.css'
import { BREAD_CRUMD_DATA, SUPPORT_FOOTER } from "../../utils/globals";
import DashboardHeader from "../../pages/Dashboard/subcomponents/header/header";
import { ADD_SUPPORT_ROUTE, GET_PROJECTS_ROUTE, GET_PROJECT_PAYLOAD, SET_SUPPORT_PAYLOAD } from "../../utils/api_constants";
import ApiService from "../../services/apiService";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AccordionToggleDown from '../../images/arrow_down.png'
import AccordionToggleUp from '../../images/arrow_up.png'
import FAQ from '../../images/faq.png'
import { setLoader, setToast, setToastLoader } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";
import Select from 'react-select';
import { connect } from 'react-redux';
function Support(props) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  // const options = [
  //   { value: "Abe", label: "Abe"},
  //   { value: "John", label: "John"},
  //   { value: "Dustin", label: "Dustin"}
  // ];

  const history = useHistory()

  const [Support, setSupport] = useState(SET_SUPPORT_PAYLOAD)
  const dispatch=useDispatch()
  const api = new ApiService()
  const [projects,setProjects]=useState([])
  const [projectId,setProjectId]=useState(null)
  const onSupportInputType = (label, value) => {
    Support[label] = value;
    setSupport(Support);
  }

  useEffect(() => {
    if (!props.isAuth) {
        history.push("/login")
    }
}, [props])


  const addSupport = () => {


    const valid=checkValid()

    if(valid){
      Support.project_id = projectId;
      Support.user_id=localStorage.getItem("id");
      setSupport(Support);
      props.dispatch(setLoader(true))
      api.postRequest(ADD_SUPPORT_ROUTE, Support).then((response) => {
        history.push("/dashboard")
        props.dispatch(setLoader(false))
        dispatch(setToastLoader("Thank you for your valuable feedback"))
      }).catch((error) => {
        props.dispatch(setLoader(false))
        dispatch(setToast("Server Error"))
      })
    }
    else{
      dispatch(setToast("Enter all input fields"))
    }
   

  }


  const checkValid = ()=>{
    if(Support.email_id!="" && Support.discord_id!="" && Support.message!="" ){
      return true
    }
    return false;
  }

  const onChangeProject  = (e) =>{
    setProjectId(e.target.value)
  }


  useEffect(() => {
    GET_PROJECT_PAYLOAD.user_id = localStorage.getItem("id")
    api.postRequest(GET_PROJECTS_ROUTE, GET_PROJECT_PAYLOAD).then((response) => {
      if(response.data.length!=0){
        setProjectId(response.data[0].id)
        setProjects([...response.data])
        const projects = [...response.data];
        const projects_arr = [];
        projects.forEach(proj => {
          console.log(proj.project_name);
          let obj = { value: proj.project_name, label: proj.project_name};
          projects_arr.push(obj);
        });
        setOptions(projects_arr);
      }
    })
  }, [])

  return <>
    <DashboardHeader DATA={BREAD_CRUMD_DATA.SUPPORT}></DashboardHeader>
    
    <div className="support_div">
      <div className="title">
        <p className="">Support</p>
      </div>

      <div className="form_support">
        <div className="form_container">
          <div className="">
            <p>Email Id</p>
            <input onChange={(event) => onSupportInputType("email_id", event.target.value)}
              type="text"
              className="inputs_support"
            />
          </div>

        </div>
        <div className="form_container2">
          <div className="">
            <p>
              Discord Id
            </p>
          </div>
          <input onChange={(event) => onSupportInputType("discord_id", event.target.value)}
            type="text"
            className="inputs_support"
          />
        </div>
      </div>



      <div className="form_support">
        <div className="form_container">
          <div className="">
            <p>
              Project
            </p>
          </div>

          <Select className="select_support_project" 
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options} />
          {/* <select className="select_support_project" onChange={onChangeProject}>
          <option className="support_input" value="">
              Select Project</option>
            {projects.map((pro)=>
            <option className="support_input" value={pro.id}>
              {pro.project_name}</option>
              
            )}
            <option className="support_input" value="">
              Select Project</option>
          </select> */}
        </div>
      </div>






      <div className="form_support">
        <div className="form_container">
          <div className="">
            <p>
              Message
            </p>
          </div>
          <textarea className="textarea_support" onChange={(event) => onSupportInputType("message", event.target.value)} />
        </div>
      </div>

      <div className="send_msg_div">
        <button className="send_msg" onClick={() => addSupport()}>Send Message</button>
      </div>

      <div className="support_footer_div">

        {SUPPORT_FOOTER.card.map((footer) =>
          <div className="support_footer_flex">
            <div><img alt="slide" className="foot_image" src={footer.imgurl}></img></div>
            <div><p className="foot_name">{footer.name}</p></div>
          </div>

        )}



      </div>

    </div>
    <div className="support_space"></div>
  </>
}

function mapStateToProps(state) {
  return {
      isAuth:state.isAuth
  };
}

export default connect(mapStateToProps)(Support);

