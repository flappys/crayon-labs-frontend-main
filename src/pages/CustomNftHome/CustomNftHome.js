
import { useState, useEffect } from "react";
import { BREAD_CRUMD_DATA } from "../../utils/globals";
import DashboardHeader from "../Dashboard/subcomponents/header/header";
import { useHistory } from "react-router-dom";
import "react-responsive-modal/styles.css";
import Accordion from "../../components/Accordion/accordion";
import AccordionToggleDown from '../../images/arrow_down.png'
import AccordionToggleUp from '../../images/arrow_up.png'
import FAQ from '../../images/faq.png'
import { GET_PROJECTS_ROUTE, GET_PROJECT_PAYLOAD } from "../../utils/api_constants";
import ApiService from "../../services/apiService";
import { setLoadApi, setLoader, setToast } from "../../redux/actions/actions";
import { connect } from "react-redux";
import bulk from '../../images/bulk.png'
import custom from '../../images/custom.png'
function NFT_Home(props) {
  const [count, setCount] = useState(1);
  const api = new ApiService()
  const history = useHistory();
  const [projects, setProjects] = useState(1);
  const [acc, setAcc] = useState({})
  const [response, setResponse] = useState(false)


  useEffect(() => {
    if (!props.isAuth) {
        history.push("/login")
    }
  }, [props])


  useEffect(() => {
       
    getProject()

    

   
      
}, [props.LoadApi])

  const createProject = () => { 
    history.push("/create_project")
    // console.log("inner");
  }

  const getProject = () => {
    GET_PROJECT_PAYLOAD.user_id = localStorage.getItem("id")
    let data = {
      accordionToggleDown: AccordionToggleDown,
      accordionToggleUp: AccordionToggleUp,
      faqIcon: FAQ,
      accordion: [],
    }
    props.dispatch(setLoader(true))
    api.postRequest(GET_PROJECTS_ROUTE, GET_PROJECT_PAYLOAD).then((response) => {
      props.dispatch(setLoadApi(false))
      if (response.data.length > 0) {
        setProjects(1)
      }
      else {
        setProjects(0)
      }

      let accordionInput = {
        accordion_id: "",
        accordion_name: "",
        accordion_trigger: false,
        tab_id: '',
        modal_icon: "",
        showWhiteList:true,
        imgArr:  [
          { imgUrl: bulk, id: 1, name: "Bulk Upload" ,route:"/upload_nft",className:"item1"},
          { imgUrl: custom, id: 2, name: "Custom NFT" ,route:"/custom_nft",className:"item1"},
        ],

      }
      let accordion = []

      response.data.map((list) => {
        accordionInput.accordion_name = list.project_name
        accordionInput.accordion_id = list.id
        accordion.push({ ...accordionInput })
      })
      data.accordion = accordion;
      setAcc({ ...data });
      props.dispatch(setLoadApi(false))
      setResponse(true);
      props.dispatch(setLoader(false))
    }).catch((error) => {
    
      props.dispatch(setToast("Server Error"))
      props.dispatch(setLoader(true))

    })
  }

  return (
    <>
      <DashboardHeader DATA={BREAD_CRUMD_DATA.NFTHOME}></DashboardHeader>
      {projects == 0 ?

        <div className='no_projects'>
          <p className='maindata'>Looks like you haven't created any Project</p>

          <p className='maindata2'>Click the below button to get started</p>

          <div className='text_button_center' onClick={() => createProject()}>
                    <p>Create Project</p>
                </div>
         
        </div>


        : <div className='projectexists'>
          <div className='create_project_btn'>
          <div className='project_btn' onClick={() => createProject()}>
                        <p>Create Project</p>
                    </div>
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

export default connect(mapStateToProps)(NFT_Home);

