import './drag.css';
import { useDispatch } from "react-redux";
import Close from '../../images/close.png'
import { addImages, CloseModel, openModel, setToast } from '../../redux/actions/actions';
import ChooseImageModal from '../chooseImage/chooseImage';
import { DIALOG_RESPONSIVE_BREAK_FOR_UPLOAD_NFT } from '../../utils/globals';
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {useDropzone} from 'react-dropzone';
function Drag(props) {
    const dispatch = useDispatch()
    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
           
            selectFiles(acceptedFiles,1)
        }
      });
    const location = useLocation();
    const [extension, SetExtension] = useState(location.pathname.includes("art") || location.pathname.includes("upload_nft") ? "image/png,image/jpeg" : ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel")

    const closeButton = () => {
        dispatch(CloseModel(true))
    }






    const selectFiles = (event,index) => {
        let images = [];

        if(index==0){
            for (let i = 0; i < event.target.files.length; i++) {
                images.push({ file: event.target.files[i], image_ID: uuidv4(), project_id: props.id, target: event.target.files[i], rarity: "10", percentage: "0", byte: bytesToSize(event.target.files[i].size), index: i, path: URL.createObjectURL(event.target.files[i]), name: event.target.files[i].name, file_name: (event.target.files[i].name).substring(0, (event.target.files[i].name).lastIndexOf('.')) })
            }
        }
        else{
        
            for (let i = 0; i < event.length; i++) {
                images.push({ file: event[i], image_ID: uuidv4(), project_id: props.id, target: event[i], rarity: "10", percentage: "0", byte: bytesToSize(event[i].size), index: i, path: URL.createObjectURL(event[i]), name: event[i].name, file_name: (event[i].name).substring(0, (event[i].name).lastIndexOf('.')) })
            }
        }

        console.log(images)
        openModels(images)
    }


    const openModels = (images) => {
        if (props.from == "whitelists" || props.from=="nft") {
            let params = { content: <ChooseImageModal whitelists={props.whitelist} from={props.from} data={images} ></ChooseImageModal>, style: DIALOG_RESPONSIVE_BREAK_FOR_UPLOAD_NFT }
            dispatch(openModel(params))
        }
        else if(props.from=="art") {
           
                props.layerImages.map((x) => {
                    let split = x.storage_location.split("/")
                    x.name = decodeURIComponent(split[split.length - 1]);
                })

                console.log(props.layerImages)
    
                images.map((image) => {
                  
                    image.flag = false;
                    let filter = props.layerImages.filter((x) => x.name == image.name)
                    if (filter.length != 0) {
                        image.flag = true
                    }
                })
    
                let filter = images.filter((x) => x.flag == false)    
                if (filter.length != 0) {
                    let params = { content: <ChooseImageModal whitelists={props.whitelist} from={props.from} data={filter} ></ChooseImageModal>, style: DIALOG_RESPONSIVE_BREAK_FOR_UPLOAD_NFT }
                    dispatch(openModel(params))
                }
                else {
                    dispatch(setToast("Images you selected already uploaded to server"))
                }    
            
        }




    }

    function bytesToSize(bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }
    return <div className='contentdrag'>
        <img className="closeButtondrag" src={Close} onClick={() => closeButton()}></img>
        <div className='contentcenter'>
            <div >
            <div className='text' {...getRootProps({className: 'dropzone'})}>
                <p style={{ height: '60px' }}>{props.title} </p>
                <p style={{ height: '30px' }}> or </p>



            </div>
            </div>
            <label className="custom-file-upload">
                <input type="file" {...getInputProps()} accept={extension} multiple onChange={(event) => selectFiles(event,0)} />
                <span className='uploadspan'> {props.btn_title} </span>
            </label>
        </div>

        <div className="footerbox_drag">
            <div className="footerboxflex_drag">
                <div className="footerboxcol">
                    {/* <div className="showFile_drag" >
                                <p>Show files</p>
                            </div> */}
                </div>
                <div className="footerboxcol">
                    {/* <div className="choosefile">
                                <p>You Have Choosen 0 files</p>
                            </div> */}
                </div>
                <div className="footerboxcol">
                    {/* <div className="Done_drag">
                                <p>Done</p>
                            </div> */}
                </div>
            </div>
        </div>

    </div>
}





export default Drag
