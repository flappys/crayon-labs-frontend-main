
import { useState, useEffect } from "react";
import { BREAD_CRUMD_DATA, DIALOG_RESPONSIVE_DRAG, MY_WHITELIST_CONTENT, ProjectsContent } from "../../utils/globals";
import upload from '../../images/upload.svg'
import DashboardHeader from "../Dashboard/subcomponents/header/header";
import { useHistory } from "react-router-dom";
import "react-responsive-modal/styles.css";
import Accordion from "../../components/Accordion/accordion";
import AccordionToggleDown from '../../images/arrow_down.png'
import AccordionToggleUp from '../../images/arrow_up.png'
import FAQ from '../../images/faq.png'
import './WhitelistProjects.css'
import Delete from '../../images/delete3.png'
import { DELETE_WHITELIST_ROUTE, GET_PROJECTS_ROUTE, GET_PROJECT_PAYLOAD, GET_PROJECT_PAYLOADS, GET_PROJECT_ROUTE } from "../../utils/api_constants";
import ApiService from "../../services/apiService";
import { openModel, setLoadApi, setLoader, setToast, setToastLoader } from "../../redux/actions/actions";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import Image from '../../images/download.png'
function Whitelist(props) {
  const [count, setCount] = useState(1);
  const api = new ApiService()
  const history = useHistory();
  const [projects, setProjects] = useState(2);
  const [acc, setAcc] = useState({})
  const [response, setResponse] = useState(false)
  const params = useParams()

  const [showAccordion, setAccordion] = useState(Object.keys(params).length == 0 ? true : false)
  useEffect(() => {
    if (!props.isAuth) {
        history.push("/login")
    }
}, [props])


  useEffect(() => {
    getProject()
  }, [props.LoadApi])


  const deleteWhiteList = (id) => {
    console.log(id)
    GET_PROJECT_PAYLOADS.project_id = id
    api.deleteRequest(DELETE_WHITELIST_ROUTE, GET_PROJECT_PAYLOADS).then((response) => {
        props.dispatch(setToastLoader("Whitelists Deleted Successfully"))
        props.dispatch(setLoadApi(true))
        
    }).catch((error) => {

        props.dispatch(setToast("Server Error"))
    })
  }

  const createProject = () => {
    history.push("/create_project")

}

  const getProject = () => {
    GET_PROJECT_PAYLOAD.user_id = localStorage.getItem("id")
    GET_PROJECT_PAYLOADS.project_id = params.id;
    let dataInput = {
      accordionToggleDown: AccordionToggleDown,
      accordionToggleUp: AccordionToggleUp,
      faqIcon: FAQ,
      accordion: [],
    }
    props.dispatch(setLoader(true))
    api.postRequest(params.id==undefined?GET_PROJECTS_ROUTE:GET_PROJECT_ROUTE, params.id==undefined?GET_PROJECT_PAYLOAD:GET_PROJECT_PAYLOADS).then((response) => {
      props.dispatch(setLoader(false))
      let data;
      if(params.id==undefined){
        data=response.data
      }
      else{
        data=[];
        data.push(response.data)
      }
      
      props.dispatch(setLoadApi(false))
      console.log(response)
      let accordionInput = {
        accordion_id: "",
        accordion_name: "",
        accordion_trigger: false,
        tab_id: '',
        modal_icon: "",
        whitelist_info:"",

        imgArr:  [
          { imgUrl: upload, id: 1, name: "Upload CSV/Excel", showModel: true,className:"item1",show:true },
          { imgUrl: Image, id: 2, name: "Download Sample", showModel: true,className:"item1",show:false },

        ],

      }
      let accordion = []

      data.map((list) => {
        accordionInput.accordion_name = list.project_name
        accordionInput.accordion_id = list.id
        accordionInput.whitelist_info=list.whitelist
        console.log(list)
        if(list.whitelist==null){
          accordionInput.imgArr[1].className="item1"
          accordionInput.imgArr[1].show=true
        }
        accordion.push({ ...accordionInput })
      })
      dataInput.accordion = accordion;
      setAcc({ ...dataInput });
      props.dispatch(setLoadApi(false))

      console.log(response.data )
      response.data.length==0?setProjects(0):setProjects(1)
      setResponse(true);
    }).catch((error) => {
        console.log(error)
        props.dispatch(setLoader(false))
    })
  }
  return (
    <>
      <DashboardHeader DATA={BREAD_CRUMD_DATA.WHITELISTS}></DashboardHeader>
     
      {projects == 0 ?

<div className='no_projects'>
  <p className='maindata'>Looks like you haven't created any Project</p>

  <p className='maindata2'>Click the below button to get started</p>
  <div className='text_button_center' onClick={()=>createProject()}>
                    <p>Create Project</p>
                </div>
 
</div>


: <div className='projectexists'>
  <div className='create_project_btn'>

  </div>
  <div className='center'>
    {response && <Accordion  center="center" data={acc}></Accordion>}
  </div>

</div>


}
     
    </>
  );
}

function mapStateToProps(state) {
  return {
    LoadApi: state.LoadApi,
    isAuth:state.isAuth
  };
}

export default connect(mapStateToProps)(Whitelist);

