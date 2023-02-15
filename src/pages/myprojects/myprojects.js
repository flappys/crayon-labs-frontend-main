import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Accordion from '../../components/Accordion/accordion';
import ApiService from '../../services/apiService';
import { GET_PROJECTS_ROUTE, GET_PROJECT_PAYLOAD } from '../../utils/api_constants';
import { BREAD_CRUMD_DATA } from '../../utils/globals';
import DashboardHeader from '../Dashboard/subcomponents/header/header';
import AccordionToggleDown from '../../images/arrow_down.png'
import AccordionToggleUp from '../../images/arrow_up.png'
import FAQ from '../../images/faq.png'
import carbon_folder from '../../images/carbon_folder.svg'
import upload from '../../images/upload.svg'
import whitelist from '../../images/whitelist.svg'
import wizard from '../../images/wizard.svg'
import mdl from '../../images/wizard.svg'
import './myprojects.css'
import { useHistory } from 'react-router-dom';
import { setLoadApi, setLoader, setToast } from '../../redux/actions/actions';

function Myprojects(props) {
    const [projects, setProjects] = useState(1);
    const api = new ApiService()
    const [acc, setAcc] = useState({})
    const [response, setResponse] = useState(false)
    const history = useHistory()
    const createProject = () => {
        history.push("/create_project")
        // console.log("inner");
    }


    useEffect(() => {
        if (!props.isAuth) {
            history.push("/login")
        }
    }, [props])



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
                showWhiteList:true,
                tab_id: '',
                modal_icon: mdl,
                whitelistInfo:"",
                imgArr: [
                    { imgUrl: carbon_folder, id: 1, name: "Project Details", route: "",className:"item1" },
                    { imgUrl: wizard, id: 2, name: "Generate Wizard", route: "",className:"item1" },
                    { imgUrl: upload, id: 3, name: "NFT Upload", route: "",className:"item1" },
                    { imgUrl: whitelist, id: 4, name: "Whitelist", route: "",className:"item1" },

                ],

            }
            let accordion = []

            response.data.map((list) => {
                accordionInput.whitelistInfo=list.whitelist;
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
            props.dispatch(setLoader(false))
            props.dispatch(setToast("Server Error"))
         
        })
    }


    useEffect(() => {
       
        getProject()

       
          
    }, [props.LoadApi])

    return <div>

        <DashboardHeader DATA={BREAD_CRUMD_DATA.PROJECTS}></DashboardHeader>

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
                    {response && <Accordion showDelete={true} data={acc}></Accordion>}
                </div>

            </div>


        }

    </div>

}


function mapStateToProps(state) {
    return {
        LoadApi: state.LoadApi,
        isAuth:state.isAuth
    };
}

export default connect(mapStateToProps)(Myprojects);