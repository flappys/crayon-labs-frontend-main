
import React, { useState, useEffect } from "react";
import './UploadNFTData.css'
import DashboardHeader from "../../../src/pages/Dashboard/subcomponents/header/header";
import file from '../../../src/images/Files.svg'
import { connect, useDispatch } from "react-redux";
import { BREAD_CRUMD_DATA, DIALOG_RESPONSIVE_DRAG } from "../../utils/globals";
import { openModel, setToast, setToastLoader } from "../../redux/actions/actions";
import Drag from "../../modalPageTemplates/DragImages/drag";
import { useHistory } from "react-router-dom";
import ApiService from "../../services/apiService";
import { ADD_BULK_UPLOAD } from "../../utils/api_constants";
import { useParams } from "react-router-dom";


function UploadNFTData(props) {
    const dispatch = useDispatch()
    const [uploadflag, setUploadFlag] = useState(false);
    const [incomingImage, setIncomingImages] = useState([])
    const params=useParams()
    const api = new ApiService()
    const history = useHistory()
    useEffect(() => {
        if (props.getImages.image_data.length > 0) {
            setUploadFlag(true)
            setIncomingImages([...props.getImages.image_data])
        }
    }, [props.getImages])
    useEffect(() => {
        console.log("inee")
        if (!props.isAuth) {
            history.push("/login")
        }
      }, [props])

    const openDrag = () => {
        let params = { content: <Drag btn_title='choose a local file' from="nft" title="Drag & Drop any Files"></Drag>, style: DIALOG_RESPONSIVE_DRAG }
        dispatch(openModel(params))
    }

    const onDelete = (index) => {
        incomingImage.splice(index, 1);
        setIncomingImages([...incomingImage])
    }

    const bulkUpload = () => {
        const formData = new FormData();
        incomingImage.map((data) => {
            formData.append("file[]", data.file);
        })
        formData.append("project_id", params.id);
        api.uploadImage(ADD_BULK_UPLOAD,formData).then((response)=>{
           
            if(response.data=="ok"){
                history.push("/nft_home")
                dispatch(setToastLoader("Nft Images Successfully Uploaded"))
            }

        }).catch((error)=>{
            history.push("/nft_home")
            dispatch(setToast("Server Error"))
        })

    }



    return <>
        <DashboardHeader DATA={BREAD_CRUMD_DATA.NFT_UPLOAD}></DashboardHeader>

        <div className="uploadnfs">

            <div className="center">
                <div className="container-flex">
                    <div className="flex1">
                        <div className="container">

                            <div className="upload-grid">
                                <img alt="" className="file_icon" src={file} />
                            </div>
                            <div className="upload-grid">

                                <label className="custom" onClick={() => openDrag()}>choose a file</label>

                            </div>
                        </div>
                    </div>
                    <div className="flex1">
                        <h4 className="h4_heading">Expected Data Format</h4>
                        <p className="p_content">Upload pairs of images & JSON files with the same title. For example,<br /> "NFT1.jpg" and "NFT1.
                            json" will be required to build "NFT1".</p>

                        <p className="p_content" style={{ display: 'flex', alignItems: "center" }}>Image files can be JPG, JPEG, PNG, or GIF. <button className="sample_json_btn">Sample JSON Format</button></p>

                    </div>


                </div>
                {uploadflag == true && <div className="imagebody">
                    <div className="imagerow">
                        {incomingImage.map((image, index) => <div className="imagesect">
                            <img src={image.path} className="uploanftimg"></img>
                            <p className="sub_image_data">Awaiting JSON</p>
                            <div className="delete_button_upload" onClick={() => onDelete(index)}>
                                Delete
                            </div>
                        </div>)}
                    </div>
                </div>}
                <div className="space"></div>
            </div>
            <div className="footer_upload_nft">
                <h4>Bulk Upload <br /> NFT Data</h4>
                <p>Import NFT images & JSON pairs datasets from another generator.</p>
                <button className="finalize_btn" onClick={() => bulkUpload()}>Finalize & Import</button>
                <button className="sync_btn">Sync</button>
            </div>
        </div>

    </>
} function mapStateToProps(state) {
    return {
        getImages: state.getImages,
        isAuth:state.isAuth
        
    };
}
export default connect(mapStateToProps)(UploadNFTData);


