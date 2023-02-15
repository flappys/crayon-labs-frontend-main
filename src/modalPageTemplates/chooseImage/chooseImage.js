
import React, { useState } from "react";
import './chooseImage.css'
import Delete from '../../images/delete.png'
import Close from '../../images/close.png'
import { CloseModel, addImages, setToastLoader, setLoadApi, setLoader } from "../../redux/actions/actions";
import { connect } from "react-redux";

import { ADD_WHITE_LISTS_ROUTE, ADD_WHITE_LISTS_ROUTE_TEST, GET_PROJECTS_ROUTE, UPDATE_WHITE_LISTS_ROUTE, UPDATE_WHITE_LISTS_ROUTE_TEST } from "../../utils/api_constants";
import ApiService from "../../services/apiService";
function ChooseImageModal(props) {


    const [imagesIncoming, setIncomingImages] = useState(props.data);
    const api = new ApiService()
    const close = () => {
        props.dispatch(CloseModel(true))
    }

    const setImagesData = () => {

        if (props.from == "whitelists") {
            console.log('from whitelists')


            // let payload = {
            //     // file:"test",
            //     project_id: imagesIncoming[0].project_id
            // }

            const formData = new FormData();
            formData.append("file", imagesIncoming[0].target);
            formData.append("project_id", imagesIncoming[0].project_id);

            if (props.whitelists != null) {
                props.dispatch(setLoader(true))
                api.updateRequest(UPDATE_WHITE_LISTS_ROUTE, formData).then((response) => {
                    console.log("response from server")
                    console.log(response)
                    props.dispatch(setLoadApi(true))
                    props.dispatch(setLoader(false))
                    props.dispatch(setToastLoader("Update Whitelist Successfully completed"))
                }).catch((error) => {
                    console.log("error from server")
                    console.log(error)
                    props.dispatch(setLoader(false))
                })
            }
            else {
                props.dispatch(setLoader(true))
                api.postRequest(ADD_WHITE_LISTS_ROUTE, formData).then((response) => {
                    props.dispatch(setLoadApi(true))
                    props.dispatch(setLoader(false))
                    props.dispatch(setToastLoader("Whitelist Added Successfully"))
                }).catch((error) => {
                    console.log("error from server")
                    console.log(error)
                    props.dispatch(setLoader(false))
                })
            }

            props.dispatch(CloseModel(true));
        }
        else {
            props.dispatch(addImages(imagesIncoming));

        }
    }

    const onDelete = (i) => {
        imagesIncoming.splice(i, 1)
        setIncomingImages([...imagesIncoming])
        if (imagesIncoming.length == 0) {
            close()
        }
    }

    const deleteAll = () => {
        setIncomingImages([]);
        close()
    }

    return <div >

        <div>
            <div className="headerModal">
                <div className="headcoltop">
                    <p className="Addfiles">Add {imagesIncoming.length} files ?</p>
                </div>
                <div className="headcoltop">
                    <img className="closeButton" src={Close} onClick={() => close()}></img>
                </div>
            </div>
            <div>
                <div className={imagesIncoming.length <= 4 ? "imageflexbox-nonhover" : "imageflexbox"}>
                    {imagesIncoming.map((y, i) =>

                        <div key={i} className="mainImageFlex">
                            <div className="childrow">
                                {props.from != "whitelists" && <img className="preview" src={y.path} alt={"image-" + i} key={i} />}
                            </div>
                            <div className="childrow">
                                <p className="imageName">{y.name}</p>
                                <p className="size">{y.byte}</p>
                            </div >
                            <div className="childrow" onClick={() => onDelete(i)}>
                                <img src={Delete} className="imagedelete" ></img>
                            </div>


                        </div>



                    )}
                </div>
            </div>
            <div className="footerbox">
                <div className="footerboxflex">
                    <div className="footerboxcol">
                        <div className="showFile" onClick={() => deleteAll()}>
                            <p>Remove All</p>
                        </div>
                    </div>
                    <div className="footerboxcol">
                        <div className="choosefile">
                            <p>You Have Choosen {imagesIncoming.length} files</p>
                        </div>
                    </div>
                    <div className="footerboxcol">
                        <div className="Done" onClick={() => setImagesData()}>
                            <p>Done</p>
                        </div>
                    </div>
                </div>
            </div>




        </div>


    </div>



}

function mapStateToProps(state) {
    return {
        getImages: state.getImages,
    };
}

export default connect(mapStateToProps)(ChooseImageModal);

