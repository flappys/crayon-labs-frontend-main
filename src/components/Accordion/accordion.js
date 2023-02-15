import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import Confirm from '../../modalPageTemplates/confirm/confirm';
import DeleteProjectConfirm from '../../modalPageTemplates/DeleteProjectConfirm/DeleteProject';
import Drag from '../../modalPageTemplates/DragImages/drag';
import { openModel, setLoadApi, setLoader, setToast, setToastLoader } from '../../redux/actions/actions';
import ApiService from '../../services/apiService';
import { DELETE_PROJECT_ROUTE, DELETE_WHITELIST_ROUTE, GET_PROJECT_PAYLOADS } from '../../utils/api_constants';
import { FAQ_CONTENT, DIALOG_RESPONSIVE_BREAK_FOR_DELETE_PRO, DIALOG_RESPONSIVE_DRAG, DIALOG_RESPONSIVE_CONFIRM, DIALOG_CONTENT_CONFIRM_WHITELITS } from '../../utils/globals';
import './acoordion.css';
import downloadIcon from '../../images/download.png'
function Accordion(props) {
    const [accordion, setAccordion] = useState(props.data.accordion)
    const dispatch = useDispatch()
    const location = useLocation();
    const history = useHistory()
    const api = new ApiService()
    const [route, setRoutes] = useState(["/project_details/", "/art_wizard/", "/nft_home", "/whitelist_project/"])
    const [nftroutes, setNftRoutes] = useState(['/upload_nft/', '/custom_nft/'])
    useEffect(()=>{
        console.log(props.data.accordion)
    },[])
    const onDelete = (id) => {
        console.log(id)
        let params = { content: <DeleteProjectConfirm id={id}></DeleteProjectConfirm>, style: DIALOG_RESPONSIVE_BREAK_FOR_DELETE_PRO }
        dispatch(openModel(params))
    }
    const handleAccordion = (id, action) => {

        let index = props.data.accordion.findIndex((x) => x.accordion_id === id)

        if (action === "down") {
            props.data.accordion[index].accordion_trigger = false
            setAccordion([...accordion]);
        }
        else {
            props.data.accordion.map((acc) => {
                acc.accordion_trigger = false
                return acc;
            })
            props.data.accordion[index].accordion_trigger = true
            setAccordion([...accordion]);
        }

    }

    const download=(url)=>{
        var anchor = document.createElement('a');
        anchor.href = url;
        anchor.click();
    }
    const goToPage = (index, acc) => {
        if (location.pathname.includes("white")) {
            switch (index) {
                case 0:
                    openDrag(acc.accordion_id, acc.whitelist_info)
                    break;
                default:
                    var anchor = document.createElement('a');
                    anchor.href = "https://crayonlabs.s3.ap-south-1.amazonaws.com/2ce6f2d2-9edd-4445-b9ef-515283f12444/whitelist/Sample-file.xlsx";
                    anchor.click();

                    break;
            }
        }
        else if (location.pathname.includes("nft_home")) {
            console.log(acc)
            history.push(nftroutes[index] + acc.accordion_id)
        }
        else {
            console.log(index)
            switch (index) {
                case 0:
                    history.push(route[index] + acc.accordion_id)
                    break;
                case 1:
                    history.push(route[index] + acc.accordion_id)
                    break;
                case 2:
                    history.push(route[2])
                    break;
                default:
                    history.push(route[index] + acc.accordion_id)
                    break;
            }
        }


    }



    const openData = (acc) => {
        
        if (acc.whitelist_info == null) {
            dispatch(setToast("This Project has no whitelists"))
        }
        else {
            let params = { content: <Confirm acc={acc} deletWhiteList={()=>deletWhiteList(acc)} data={DIALOG_CONTENT_CONFIRM_WHITELITS}></Confirm>, style: DIALOG_RESPONSIVE_CONFIRM }
            dispatch(openModel(params))
        }

    }

    const transform =(url)=>{
        let split=url.split('/')
        return split[split.length - 1]

    }

    const deletWhiteList=(acc) =>{
          dispatch(setLoader(true))
            GET_PROJECT_PAYLOADS.project_id = acc.accordion_id
            api.deleteRequest(DELETE_WHITELIST_ROUTE, GET_PROJECT_PAYLOADS).then((response) => {
                dispatch(setToastLoader("Whitelists Deleted Successfully"))
                dispatch(setLoadApi(true))
                dispatch(setLoader(false))
            }).catch((error) => {

                dispatch(setToast("Server Error"))
            })
    }

    const openDrag = (id, whitelistInput) => {
        let params = { content: <Drag whitelist={whitelistInput} id={id} btn_title="choose a local file" from="whitelists" title=" Drag & Drop CSV/Excel"></Drag>, style: DIALOG_RESPONSIVE_DRAG }
        dispatch(openModel(params))
    }
    return <div className='content-pos'>
        {props.data.accordion.map((acc) =>
            <div className='mainAccFlex'>
                <div className='accflex1'>
                    <div className="accordionBox">
                        <div className="accordiontitle">
                            <div className="accordionflex">
                                <div className="accordioncol1">
                                    <div className="question">
                                        <p className="question"  onClick={() => acc.accordion_trigger ? handleAccordion(acc.accordion_id, "down") : handleAccordion(acc.accordion_id, "up")}>Project Name : {acc.accordion_name} </p>
                                        {location.pathname.includes("white") && acc.whitelist_info && <div className='download_option'>
                                        <p style={{color:"white"}}>{transform(acc.whitelist_info.storage_location)}</p>
                                        <div className='button_flex'>
                                            <button className='download' onClick={()=>download(acc.whitelist_info.storage_location)}>Download</button>
                                            <button className='download' onClick={()=>deletWhiteList(acc)}>Remove</button>
                                        </div>
                                    </div>}
                                    </div>
                                    <div className="answergrid">
                                        {acc.accordion_trigger && (
                                            <div className={props.center == "center" ? "grid-container center" : "grid-container"}>
                                                {acc.imgArr.map((img, index) => (
                                                    <div className="item1" onClick={() => goToPage(index, acc)}>
                                                        <img
                                                            alt=""
                                                            className="icon_item"
                                                            src={img.imgUrl}
                                                        />
                                                        <p className="icon_title">{img.name}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="accordioncol1">
                                    {acc.accordion_trigger ? <img alt="slide" onClick={() => handleAccordion(acc.accordion_id, "down")} className="Icon1" src={FAQ_CONTENT.accordionToggleUp}></img> : <img alt="slide" onClick={() => handleAccordion(acc.accordion_id, "up")} className="Icon1" src={FAQ_CONTENT.accordionToggleDown}></img>}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='accflex2' >
                    {props.showDelete == true && <button className="del-btn" onClick={() => onDelete(acc.accordion_id)}>
                        Delete
                    </button>}
                </div>

            </div>

        )}



    </div>
}

export default Accordion;
