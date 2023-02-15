import React, { useEffect, useState } from "react";
import './CreateRules.css'
import { connect } from "react-redux";
import Tick from '../../images/tick.png'
import { FAQ_CONTENT } from "../../utils/globals";
import search from '../../images/search.png'
import Delete from '../../images/delete3.png'
import do_not_pair from '../../images/layer_x_blk.svg'
import only_pair_with from '../../images/layer_add_blk.svg'
import skip_layer from '../../images/layer_skip_blk.svg'
import { useHistory, useParams } from "react-router-dom";
import do_not_pair_w from '../../images/layer_x_white.svg'
import only_pair_with_w from '../../images/layer_add_white.svg'
import skip_layer_w from '../../images/layer_skip_white.svg'
import ApiService from "../../services/apiService";
import { UPDATE_RULE_IMAGE } from "../../utils/api_constants";
import { CloseModel, setLoadApi, setToast, setToastLoader } from "../../redux/actions/actions";
import ShowModal from "../../redux/reducer/ShowModal";
import toast, { Toaster } from 'react-hot-toast'

function CreateRules(props) {

    const history = useHistory()
    const [tabs, setTabs] = useState([
        { name: "Create Rule", id: 1 },
        { name: "Rules", id: 2 }
    ])

    const [tabId, setTabId] = useState(1)
    const [SubtabId, setSubTabId] = useState(1)
    const [layerSelectedImageID, setSelectedImageID] = useState("")
    const [subTabs, setSubTabs] = useState([
        { name: "Do Not Pair", id: 1, subname: "Do not pair", icon: do_not_pair, icon2: do_not_pair_w },
        { name: "Only Pair", id: 2, subname: "Pair", icon: only_pair_with, icon2: only_pair_with_w },
        { name: "Skip Layer", id: 3, subname: "Skip", icon: skip_layer, icon2: skip_layer_w }
    ])
    const [subtabName, setSubTabname] = useState("Do Not Pair")
    const [PairName, setPairName] = useState("")
    const [rules, setRules] = useState([])
    const onTabSelect = (id) => {
        setTabId(id)
        setPairName(subTabs[SubtabId - 1].subname)
        console.log(currentImageRule)
    }
    const api = new ApiService()
    const onHandleAccordion = (index) => {
        if (layers[index].toggleAccordion) {
            layers[index].toggleAccordion = false
        }
        else {
            layers[index].toggleAccordion = true
        }
        setLayers([...layers])
    }
    const [layers, setLayers] = useState([])
    const [currentImageRule, setCurrentImageRule] = useState([])
    useEffect(() => {
        let filter = props.layerData.filter((data) => data.id != props.id)
        filter.map((x) => {
            x.accordionToggle = false;
           x.images.map((y)=>{
               y.name=y.storage_location.split("/")[y.storage_location.split("/").length - 1].substring(0, y.storage_location.split("/")[y.storage_location.split("/").length - 1].length - 4)
           })
        })
        setSelectedImageID(props.selectedImage.id)
        console.log(filter)
        checkRules()
        setLayers([...filter])
    }, [props])


    const openImage = (imagName) => {
     
        addRulese(imagName)

    }

    const addRulese = (imagName) => {
        if(currentImageRule.length!=0){
            let filter=currentImageRule.filter((x)=>x.image_id==imagName.id)
            if(filter.length==0){
                currentImageRule.push( { layerId: props.id, image_id: imagName.id, selected_layer_image_id: layerSelectedImageID, tabSelected: subtabName, selectedImagePath: imagName.storage_location, current_image_path: props.selectedImage.storage_location })
                setCurrentImageRule([...currentImageRule])
            }
            else{
                let filter=currentImageRule.filter((x)=>x.image_id==imagName.id && x.tabSelected==subtabName)

                if(filter.length!=0){
                    let index = currentImageRule.findIndex((x) => x.image_id == imagName.id && x.selected_layer_image_id == layerSelectedImageID);
                    currentImageRule.splice(index, 1);
                    setCurrentImageRule([...currentImageRule])  
                }
                else{ 

                    toast.error("Rules Added", { position: 'bottom-right' })
                  
                }
            }
           
        }
        else{
            let dataPush = []
            dataPush.push(
                { layerId: props.id, image_id: imagName.id, selected_layer_image_id: layerSelectedImageID, tabSelected: subtabName, selectedImagePath: imagName.storage_location, current_image_path: props.selectedImage.storage_location }
            )
            setCurrentImageRule([...dataPush])
        }
    

    }

    const onDeleteRule = (index)=>{
        currentImageRule.splice(index, 1);
        setCurrentImageRule([...currentImageRule])  
    }

    const checkRules = () => {
        if (props.selectedImage.rules != null) {
           
            console.log(JSON.parse(props.selectedImage.rules))
            setCurrentImageRule(JSON.parse(props.selectedImage.rules))
        }
    }

    const addRules = () => {
        console.log(currentImageRule)
        const formData = new FormData()
        formData.append("layer_image_id", props.selectedImage.id)
        formData.append("rules", JSON.stringify(currentImageRule))
        api.updateRequestForm(UPDATE_RULE_IMAGE, formData).then((res) => {
            props.dispatch(CloseModel(true))
            props.dispatch(setLoadApi(true))
        }).catch((err) => {
            console.log(err)
        })
    }


    return <>
        <>

            <div className="create_rules_tab_div">
                {tabs.map((tab, index) =>
                    <>
                        <div className="tabmainrule" onClick={() => onTabSelect(tab.id)}>
                            <div className={tab.id == tabId ? "rulename active" : "rulename"}>
                                <p className="ruletab">{tab.name}</p>
                            </div>
                        </div>

                    </>

                )}
            </div>

            {tabId == 1 && <div className="sub_tabsrules">
                {subTabs.map((subtab, index) =>
                    <>
                        <div className="subtab" onClick={() => setSubTabname(subtab.name)}>
                            <div className={subtab.name == subtabName ? "subtabrule active" : "subtabrule"}>

                                <p className="subtabtext">
                                    <img className="tabs_icon" style={{ width: "28px" }} src={subtab.name == subtabName ? subtab.icon2 : subtab.icon}></img>
                                    {subtab.name}</p>
                            </div>
                        </div>

                    </>

                )}
            </div>}

            {tabId == 1 && <div className="mainbox">
                {subtabName!="Skip Layer" &&<div>
                <div className="layerheaderrule">
                    <div className="layerheadercol">
                        <div className="innerlayerflex">
                            <div className="innerflex1">
                                {/* <p className="layernamemain">{layer_name} <span style={{ fontWeight: "normal" }}>(selected) </span></p> */}
                            </div>
                            <div className="innerflex2">
                                <img src={Tick} className="tick"></img>
                                <img src={props.selectedImage.storage_location} className="previewimageinner"></img>
                                {/* <p>photohlhlhl</p> */}
                            </div>
                        </div>
                    </div>
                    <div className="layerheadercol">

                        {/* <input placeholder="Search Layer" className="searchlayer"></input> */}
                        {/* <img src={search} className="search"></img> */}
                    </div>
                </div>

                <div className="accordionmainrule">
                    {layers.map((accordion, index) =>
                        <>
                            <div className="accordionboxrule">
                                <div className="accordionimageheader" >
                                    <div className="accordioncol1">
                                        <p className="layernametop">{accordion.layer_name}</p>
                                    </div>
                                    <div className="accordioncol1">
                                        {accordion.toggleAccordion == false ? <img alt="slide" onClick={() => onHandleAccordion(index)} className="Icon1" src={FAQ_CONTENT.accordionToggleUp}></img> : <img alt="slide" onClick={() => onHandleAccordion(index)} className="Icon1" src={FAQ_CONTENT.accordionToggleDown}></img>}
                                    </div>
                                </div>
                                <div>
                                    {accordion.toggleAccordion == true && <div className="imagenewrows" >
                                        {accordion.images.map((images, indexImg) =>
                                            <>
                                                <div className="imagecol" onClick={() => openImage(images)}>

                                                    <div className="imageboxrule" >
                                                        {currentImageRule.filter((x) => x.image_id == images.id && x.tabSelected == subtabName && x.selected_layer_image_id == layerSelectedImageID).length != 0 && <img className="tickS" src={Tick}></img>}
                                                        <img className="pathimages" src={images.storage_location}></img>
                                                        <p className="label">{images.name}</p>
                                                    </div>



                                                </div>
                                            </>
                                        )}
                                    </div>}
                                    <div className="space_bottom_rule"></div>
                                </div>

                            </div>
                        </>
                    )}
                </div>


                </div>}
            </div>}


            {/* { layerId: props.id, image_id: imagName.id, selected_layer_image_id: layerSelectedImageID, tabSelected: subtabName,selectedImagePath:imagName.storage_location,current_image_path:props.selectedImage.storage_location} */}
            {tabId == 2 && <div className="mainbox">
                {currentImageRule.map((rule, indexmain) =>
                    <div className="rulebox">
                        <p className="ruletext">Rule {indexmain + 1}</p>

                        <div className="rulesflex">
                            <div className="rulecolum">
                                <p className="pairwith">{rule.tabSelected}</p>
                            </div>
                            <div className="rulecolum">
                                <div className="imageboxrulefinal">

                                    <img className="pathimages" src={rule.selectedImagePath}></img>

                                </div>
                            </div>
                            <div className="rulecolum">
                                <p className="pairwith">with</p>
                            </div>
                            <div className="rulecolum">
                                <div className="imageboxrulefinal">

                                    <img className="pathimages" src={rule.current_image_path}></img>

                                </div>
                            </div>
                            <div className="rulecolum">

                            </div>
                            <div className="rulecolum">
                                <img className="delete_icon_rule" src={Delete} onClick={() =>onDeleteRule(indexmain)}></img>
                            </div>
                        </div>
                    </div>)
                }
            </div>}

        </>
        <>
            <div className="btm_add_rule_div" onClick={() => addRules()}>
                <button className="btm_add_rule_btn">Add Rule</button>
            </div>
        </>


    </>

}

function mapStateToProps(state) {
    return {
        Layers: state.Layers,
    };
}

export default connect(mapStateToProps)(CreateRules);


