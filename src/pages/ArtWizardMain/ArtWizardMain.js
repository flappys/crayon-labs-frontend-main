import React, { useEffect, useRef, useState, useCallback } from "react";
import "./ArtWizardMain.css";
import DashboardHeader from "../../pages/Dashboard/subcomponents/header/header";
import {
  ART_WIZARD_MAIN,
  BREAD_CRUMD_DATA,
  DIALOG_RESPONSIVE_CREATE_RULE,
  DIALOG_RESPONSIVE_DRAG,
} from "../../utils/globals";
import { connect, useDispatch } from "react-redux";
import {
  addImages,
  openModel,
  setLayers,
  setLoadApi,
  setLoader,
  setToast,
  setToastLoader,
} from "../../redux/actions/actions";
import Drag from "../../modalPageTemplates/DragImages/drag";
import blank from "../../images/blank.png";
import Delete from "../../images/delete3.png";
import CreateRules from "../../modalPageTemplates/CreateRules/CreateRules";
import { useHistory, useParams } from "react-router-dom";
import CL_img from "../../images/create_layers.png";
import GC_img from "../../images/Generate_collection.png";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import ApiService from "../../services/apiService";
import {
  ADD_LAYER_IMAGES,
  UPDATE_LAYER_ORDER,
  ADD_UPLOAD_LAYER,
  DELETE_LAYER,
  DELETE_LAYER_IMAGE,
  GET_ALL_LAYERS,
  GET_ALL_LAYERS_IMAGES,
  GET_PROJECTS_ROUTE,
  GET_PROJECT_PAYLOAD,
  UPDATE_LAYER_NAME,
  UPDATE_RARITY,
  UPDATE_ALL_RARITY,
  UPDATE_LAYER_BLANK,
  GEN_NFT,
  UPLOAD_NFT_TO_S3,
  DOWNLOAD_NFT_BUILD,
  GET_PROJECT_DATA,
} from "../../utils/api_constants";
import LoadApi from "../../redux/reducer/LoadApi";
import Icon from "../../images/dragicon.png";
import { ReactSortable } from "react-sortablejs";
import { arrayMoveImmutable } from "array-move";

function ArtWizardMain(props) {
  const dispatch = useDispatch();
  const [layerIndex, setLayerIndex] = useState(0);
  const [layersInfo, setLayersInfo] = useState([]);
  const draggingItem = useRef();
  const dragOverItem = useRef();
  const history = useHistory();
  const api = new ApiService();
  const params = useParams();
  const [layerName, setLayerName] = useState("");
  const [layerImages, setLayerImages] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [checkParams, setParams] = useState(
    params.id == undefined ? false : true
  );
  const [projects, setProjects] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [selectedLayerData, setSelectedlayer] = useState(null);
  const [count, setCount] = useState(0);
  const [focus, setFocus] = useState(false);
  const [timer, setTimer] = useState(null);
  const [availableRarity, setAvailableRarity] = useState(0);
  const [showDownloadBTN, setShowDownloadBTN] = useState(false);
  useEffect(() => {
    setLayerIndex(0);
    getAllLayers();
  }, []);

  useEffect(() => {
    if (props.LoadApi) {
      getAllLayers();
      props.dispatch(setLoadApi(false));
    }
  }, [props.LoadApi]);

  useEffect(() => {
    if (props.getImages.image_data.length != 0) {
      props.getImages.image_data.map((x) => {
        x.file = new File([x.file], replaceDash(x.file.name))
      })

      addImageToLayer(props.getImages.image_data);
    }
  }, [props.getImages]);

  useEffect(() => {
    if (!props.isAuth) {
      history.push("/login");
    }
  }, [props]);

  const selectLayer = (index) => {
    if (layerIndex != index) {
      setLayerIndex(index);
      getAllLayers(true);
    }
  };

  const getAllLayers = () => {
    const formData = new FormData();
    formData.append("project_id", params.id);
    props.dispatch(setLoader(true));
    api
      .uploadImage(GET_ALL_LAYERS, formData)
      .then((response) => {
        if (response.data[layerIndex].images.length != 0) {
          response.data[layerIndex].previous_images =
            response.data[layerIndex].images;
          response.data[layerIndex].images.map((x) => {
            let split = x.storage_location.split("/");
            x.name = split[split.length - 1];
          });
        }
        props.dispatch(setLoader(false));
        setLayersInfo([...response.data]);
      })
      .catch((error) => {
        props.dispatch(setLoader(false));
      });
  };

  // const setRarity = (data) => {

  //   let current_layer_data = data[layerIndex].images

  //   if (current_layer_data.length != 0) {
  //     data[layerIndex].previous_images = data[layerIndex].images;
  //     data[layerIndex].images.map((x) => {
  //       let split = x.storage_location.split("/")
  //       let name = encodeURI(split[split.length - 1])
  //       x.name = name;
  //     })
  //     setLayersInfo([...data])
  //   }
  //   else {
  //     data[layerIndex].previous_images = data[layerIndex].images;
  //     setLayersInfo([...data])
  //   }
  // }

  const updateOrder = (data) => {
    let final_data = [];

    data.map((x, index) => {
      final_data.push({
        layer_id: x.id,
        layer_order: index + 1,
        name: x.layer_name,
      });
    });
    let payload = {
      project_id: params.id,
      layer_orders: final_data,
    };
    api
      .updateRequest(UPDATE_LAYER_ORDER, payload)
      .then((res) => {
        // selectLayer(localStorage.getItem("layerIndex"))
        getAllLayers();
        props.dispatch(setLoader(false));
      })
      .catch((error) => {
        props.dispatch(setLoader(false));
      });
  };

  //to add layer
  const addLayer = () => {
    const formData = new FormData();
    formData.append("project_id", params.id);
    formData.append("layer_name", `layerName${layersInfo.length + 1}`);
    formData.append("layer_order", parseInt(layersInfo.length + 1));
    props.dispatch(setLoader(true));
    api
      .uploadImage(ADD_UPLOAD_LAYER, formData)
      .then((response) => {
        getAllLayers(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //when input out of focus update layer name
  const updateLayerName = (layername, item, index, flag) => {
    console.log(layername)
    if (layername.includes("-")) {
      dispatch(setToast("layer name cannot contain dashes"))
      return;
    }
    else {
      layersInfo[index].layer_name = layername;
      setLayersInfo([...layersInfo]);
      clearTimeout(timer);
      setTimer(
        setTimeout(() => {
          let formData = new FormData();
          formData.set("layer_id", item.id);
          formData.set("layer_name", layername);
          props.dispatch(setLoader(true));
          api
            .updateRequestForm(UPDATE_LAYER_NAME, formData)
            .then((res) => {
              props.dispatch(setLoader(false));
            })
            .catch((error) => {
              props.dispatch(setLoader(false));
            });
        }, 500)
      );
    }


  };
  const deleteLayer = (value) => {
    const formData = new FormData();
    formData.append("layer_id", value.id);
    formData.append("project_id", params.id);
    props.dispatch(setLoader(true));
    api
      .deleteRequestUpload(DELETE_LAYER, formData)
      .then((response) => {
        setLayerIndex(0);
        updateOrder(response.data);
      })
      .catch((error) => {
        props.dispatch(setLoader(false));
      });
  };

  //function for drag div
  const setDrag = (state) => {
    if (layersInfo.length != 0) {
      setFocus(true);
      setLayersInfo(state);
    }
  };
  //event while drop the layer div
  const Drop = (e) => {
    setLayerIndex(e.newIndex);
    updateOrder(layersInfo);
  };

  // set set for each image
  // const onSlideChange = (e, indexOfImage, image) => {
  //   const currentVal = parseFloat(e.target.value).toFixed(2);
  //   layersInfo[layerIndex].images[indexOfImage].rarity = currentVal
  //   layersInfo[layerIndex].images.map((x, index) => {
  //     if (x.id != image.id) {
  //       var v = currentVal
  //       var n = layersInfo[layerIndex].images.length;
  //       var p = (100 - v) / (n - 1)
  //       layersInfo[layerIndex].images[index].rarity = p.toFixed(2)
  //       console.log(layersInfo)
  //     }

  //   })

  //   setLayersInfo([...layersInfo])

  // }

  const genCollection = async () => {
    try {
      props.dispatch(setLoader(true));
      let proj_id = params.id;
      const getProjectDetails = await api.postRequest(GET_PROJECT_DATA, { project_id: proj_id })
      const generateCollection = await api.postRequest(GEN_NFT, { ...getProjectDetails.data })
      if(generateCollection){
        setShowDownloadBTN(true);
        dispatch(setToastLoader("Collection Genrated successfully"));
        props.dispatch(setLoader(false));
      }
      return;
    }
    catch (error) {
      props.dispatch(setLoader(false));
      dispatch(setToast("Server Error"));
    }
  };

  const downloadCollection = () => {
    let proj_id = params.id;
    // window.open(``);

    const a = document.createElement('a')
    let url=`https://crayonlabs.s3.ap-south-1.amazonaws.com/${proj_id}/${proj_id}.zip`
    a.href = url
    a.download = url.split('/').pop()
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  };

  const replaceDash = (params) => {
    let param = params.replace("-", "_")
    return param;
  }

  const [totalRarity, setTotalRarity] = useState(0);
  const onSlideChange = (e, indexOfImage, image) => {
    layersInfo[layerIndex].images[indexOfImage].image_flag = "true";
    layersInfo[layerIndex].images[indexOfImage].rarity = e.target.value;
    calculateRarityForRemainingImage();
  };

  const getTotal = (data) => {
    console.log(data);
    let total = 0;
    total = +data.rarity;
    return total;
  };

  const addImageToLayer = (dataIncoming) => {
    const formData = new FormData();
    formData.append("project_id", params.id);
    formData.append("layer_id", layersInfo[layerIndex].id);


    dataIncoming.map((data) => {
      formData.append("file[]", data.file);
    });

    props.dispatch(setLoader(true));
    api
      .postRequest(ADD_LAYER_IMAGES, formData)
      .then((response) => {
        console.log(response.data);
        getAllLayersAfterUpload(layerIndex);
        props.dispatch(addImages([]));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllLayersAfterUpload = (index) => {
    const formData = new FormData();
    formData.append("project_id", params.id);

    api
      .uploadImage(GET_ALL_LAYERS, formData)
      .then((response) => {
        props.dispatch(setLoader(false));
        if (response.data[index].images.length != 0) {
          let images = response.data[index].images;
          let length = response.data[index].images.length;
          let filterImageByFlag = images.filter((x) => x.image_flag == "false");
          let payloadData = [];
          if (filterImageByFlag.length == length) {
            images.map((data) => {
              data.rarity = 100 / length;
              payloadData.push({
                image_id: data.id,
                rarity: data.rarity,
                image_flag: data.image_flag,
              });
            });
            updateRarityApi(payloadData, response.data[index].id);
          } else {
            calculateRarity(response.data[index].images);
          }
        } else {
          setLayersInfo([]);
        }
      })
      .catch((error) => { });
  };

  const calculateRarity = (data) => {
    let manualEnteredRarity = 0;
    data.forEach((element) => {
      if (element.image_flag == "true") {
        manualEnteredRarity += parseFloat(element.rarity);
      }
    });

    let availableRarity = 100 - manualEnteredRarity;

    console.log(availableRarity);
    let unflaggedImagesLength = data.filter(
      (image) => image.image_flag == "false"
    ).length;

    let perImageRarity = availableRarity / unflaggedImagesLength;

    data.forEach((element) => {
      if (element.image_flag == "false") {
        //per image max slider value is available rarity (0 to available rarity)
        element.rarity = availableRarity == 0 ? 0 : perImageRarity;
        element.available_rarity = availableRarity;
      }
    });

    let payloadData = [];
    data.map((data) => {
      payloadData.push({
        image_id: data.id,
        rarity: data.rarity == 0 ? 0 : parseFloat(data.rarity),
        image_flag: data.image_flag,
      });
    });

    clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        updateRarityApi(payloadData, layersInfo[layerIndex].id);
      }, 1000)
    );
  };

  const updateRarityApi = (payloadData, layer_id) => {
    let payload = {
      layer_id: layer_id,
      rarity_data: payloadData,
    };

    console.log(payload);

    api
      .updateRequest(UPDATE_ALL_RARITY, payload)
      .then((response) => {
        getAllLayers();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const calculateRarityForRemainingImage = () => {
    let manualEnteredRarity = 0;

    layersInfo[layerIndex].images.forEach((element) => {
      if (element.image_flag == "true") {
        manualEnteredRarity += parseFloat(element.rarity);
      }
    });

    if (manualEnteredRarity <= 100) {
      let availableRarity = 100 - manualEnteredRarity;
      console.log(availableRarity);
      let unflaggedImagesLength = layersInfo[layerIndex].images.filter(
        (image) => image.image_flag == "false"
      ).length;

      let perImageRarity = availableRarity / unflaggedImagesLength;

      layersInfo[layerIndex].images.forEach((element) => {
        if (element.image_flag == "false") {
          //per image max slider value is available rarity (0 to available rarity)
          element.rarity = parseFloat(perImageRarity).toFixed(1);
          element.available_rarity = availableRarity.toFixed(1);
        }
      });
      setLayersInfo([...layersInfo]);
      console.log(availableRarity, "remaininng rarity");
      console.log(manualEnteredRarity, "total of used");
      console.log(perImageRarity, "divided rarity");
      console.log(
        "-------------------------------------------------------------------"
      );

      let payloadData = [];
      layersInfo[layerIndex].images.map((data) => {
        payloadData.push({
          image_id: data.id,
          rarity: parseFloat(data.rarity),
          image_flag: data.image_flag,
        });
      });

      if (manualEnteredRarity == 100) {
        dispatch(setToast("Rarity Reached 100%"));
      }

      clearTimeout(timer);
      setTimer(
        setTimeout(() => {
          updateRarityApi(payloadData, layersInfo[layerIndex].id);
        }, 1000)
      );
    } else {
      return;
    }

    // if(manualEnteredRarity<100){
    //   let unflaggedImagesLength = layersInfo[layerIndex].images.filter((image) => image.image_flag == "false").length

    //   let perImageRarity = availableRarity / unflaggedImagesLength;

    //   layersInfo[layerIndex].images.forEach((element) => {
    //     if (element.image_flag == 'false') {
    //       //per image max slider value is available rarity (0 to available rarity)
    //       element.rarity = parseFloat(perImageRarity);
    //       element.available_rarity = availableRarity;
    //     }
    //   })
    //   setLayersInfo([...layersInfo])
    //   console.log(availableRarity, "remaininng rarity")
    //   console.log(manualEnteredRarity, "total of used")
    //   console.log(perImageRarity, "divided rarity")
    //   console.log("-------------------------------------------------------------------")

    //   let payloadData = []
    //   layersInfo[layerIndex].images.map((data) => {
    //     payloadData.push({ image_id: data.id, rarity: parseFloat(data.rarity), image_flag: data.image_flag })
    //   })

    //   clearTimeout(timer);
    //   setTimer(setTimeout(() => {
    //     updateRarityApi(payloadData, layersInfo[layerIndex].id)
    //   }, 1000))
    // }
  };

  const deleteImage = (image, index) => {
    let formData = new FormData();
    formData.append("layer_image_id", image.id);
    props.dispatch(setLoader(true));
    api
      .deleteRequestUpload(DELETE_LAYER_IMAGE, formData)
      .then((resp) => {
        getAllLayers();
      })
      .catch((error) => { });
  };

  const openTool = () => {
    addLayer();
  };

  const Shuffle = () => {
    for (var a = 0; a < layersInfo.length; a++) {
      let move = arrayMoveImmutable(
        layersInfo[a].images,
        0,
        layersInfo[a].images.length
      );
      layersInfo[a].images = move;
    }
    setLayersInfo([...layersInfo]);
  };

  const [checkImage, setCheckImage] = useState(false);

  const openDrag = () => {
    if (layersInfo.length != 0) {
      let params = {
        content: (
          <Drag
            layerImages={layersInfo[layerIndex].images}
            btn_title="choose a local file"
            from="art"
            title="Drag & Drop any Files"
          ></Drag>
        ),
        style: DIALOG_RESPONSIVE_DRAG,
      };
      dispatch(openModel(params));
    } else {
      dispatch(setToast("Add atleast one Layer"));
    }
  };

  const openCreateRule = (image) => {
    // props.dispatch(setLayers(layersInfo));
    let paramsTest = {
      content: (
        <CreateRules
          p_id={params.id}
          selectedImage={image}
          layerData={layersInfo}
          id={layersInfo[layerIndex].id}
        ></CreateRules>
      ),
      style: DIALOG_RESPONSIVE_CREATE_RULE,
    };
    props.dispatch(openModel(paramsTest));
  };

  const checkButtonCount = (rules) => {
    if (rules == null) {
      return "Add Rules";
    } else {
      return `${JSON.parse(rules).length == 0 ? "Add" : JSON.parse(rules).length
        } Rules`;
    }
  };

  const valueLabel = (val) => {
    if (val >= 0 && val <= 9.99) {
      return "legendary";
    } else if (val >= 10 && val <= 19.99) {
      return "very rare";
    } else if (val >= 20 && val <= 40.99) {
      return "rare";
    } else if (val >= 41 && val <= 60) {
      return "uncommon";
    } else if (val > 60) {
      return "common";
    }
  };

  const addBlankImage = () => {
    console.log(layersInfo[layerIndex]);
    let payload = {
      layer_id: layersInfo[layerIndex].id,
      contains_blank: true,
    };
    api
      .updateRequest(UPDATE_LAYER_BLANK, payload)
      .then((response) => {
        getAllLayers();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteBlankImage = () => {
    let payload = {
      layer_id: layersInfo[layerIndex].id,
      contains_blank: false,
    };
    api
      .updateRequest(UPDATE_LAYER_BLANK, payload)
      .then((response) => {
        getAllLayers();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <DashboardHeader DATA={BREAD_CRUMD_DATA.WIZARD}></DashboardHeader>
      <hr />
      {checkParams == true && (
        <div className="center">
          <div className="flexwizard">
            <div className="wizardcol">
              <div className="gridImages">
                {layersInfo.length != 0 && (
                  <div className="wizardCard">
                    <div className="AttributeFlex">
                      <div className="attributescol" onClick={() => openDrag()}>
                        <img src={ART_WIZARD_MAIN.ImgSrc}></img>
                      </div>

                      <div className="attributescol">
                        <p
                          style={{
                            color: "black",
                            fontFamily: "DM Sans, sans-serif",
                            fontWeight: "bolder",
                            letterSpacing: "1px",
                          }}
                        >
                          Add new Attribute Name
                        </p>
                        {layersInfo[layerIndex]?.contains_blank == false && (
                          <p style={{ color: "black", textAlign: "center" }}>
                            Or
                          </p>
                        )}
                      </div>
                      {layersInfo[layerIndex]?.contains_blank == false && (
                        <div className="attributescol">
                          <button
                            onClick={() => addBlankImage()}
                            className="buttonattribute"
                          >
                            Add None/Blank
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {layersInfo.length != 0 && (
                  <>
                    {layersInfo[layerIndex].images.map(
                      (image, indexOfImage) => (
                        <div className="wizardCard" key={indexOfImage}>
                          <div className="innerflexdata">
                            <div>
                              <input
                                className="inputart"
                                value={image.name}
                              ></input>
                            </div>
                            <div>
                              <img src={blank} className="innerbgimage"></img>
                              <img
                                className="delete_icon_top"
                                src={Delete}
                                onClick={() => deleteImage(image, indexOfImage)}
                              ></img>
                            </div>
                            <div>
                              <img
                                src={image.storage_location}
                                className="innerimg1"
                              ></img>
                            </div>

                            <div className="rarityflex">
                              <p className="rarity_name">Rarity</p>
                              <input
                                disabled
                                className="rarity"
                                value={parseFloat(image.rarity).toFixed(2)}
                              ></input>
                            </div>
                            <div className="progress">
                              <input
                                type="range"
                                onChange={(e) =>
                                  onSlideChange(e, indexOfImage, image)
                                }
                                value={image.rarity}
                                min="0"
                                max="100"
                                className="inputslider"
                              ></input>
                            </div>

                            <p className="rarity_name_index">
                              Appears {parseFloat(image.rarity).toFixed(2)} % of
                              time
                            </p>

                            <div className="btn_add_rule_flex">
                              <div
                                className="btn_add_rule_col"
                                onClick={() => openCreateRule(image)}
                              >
                                <button className="addrules">
                                  {checkButtonCount(image.rules)}
                                </button>
                              </div>
                              <div className="btn_add_rule_col">
                                <button id="labelRarity" className="addrules2">
                                  {valueLabel(image.rarity)}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </>
                )}

                {/* {layersInfo[layerIndex]?.contains_blank ==true && <div className="wizardCard">
                <div className="innerflexdata">
                  <div>
                    <input className="inputart" value="Blank"></input>
                  </div>
                  <div>

                    <img src={blank} className="innerbgimage"></img>
                    <img className="delete_icon_top" src={Delete} onClick={()=>deleteBlankImage()}></img>
                  </div>
                  <div>
                    <img src={blank} className="innerimg1"></img>
                  </div>

                  <div className="rarityflex">
                    <p className="rarity_name">Rarity</p>
                    <input disabled className="rarity"></input>
                  </div>
                  <div className="progress">
                    <input
                      type="range"  value={0} min="0" max="100" className="inputslider"></input>
                  </div>

                  <p className="rarity_name_index">Appears 0 % of time</p>

                  <div className="btn_add_rule_flex">
                    <div className="btn_add_rule_col">
                      <button className="addrules" >Add Rules</button>
                    </div>
                    <div className="btn_add_rule_col">
                      <button id='labelRarity' className="addrules2">Common</button>
                    </div>
                  </div>
                </div>
              </div>} */}
              </div>
            </div>
            <div className="wizardcol">
              <div className="layersidemenu">
                <div className="layerheader">
                  <div className="layercol">
                    <p className="preview">Preview</p>
                  </div>
                  <div className="layercol" onClick={() => Shuffle()}>
                    <p className="previewtext">Random</p>
                  </div>
                </div>
                <div className="layerpreview">
                  {/* <img src={blank} className="bgimage"></img> */}
                  {layersInfo.map(
                    (data) =>
                      data.images.length != 0 && (
                        <div>
                          <img
                            className="imagelayer"
                            src={data.images[0].storage_location}
                          ></img>
                        </div>
                      )
                  )}
                </div>
                <div className="layerstitle">
                  <p>Layers</p>
                </div>
                <div className="div_create_layer">
                  <button className="layerbutton" onClick={() => openTool()}>
                    <img className="cl_gc_btn_icons" src={CL_img}></img>
                    <span>Create New Layer</span>
                  </button>
                </div>
                <div className={"layersdata"}>
                  <ReactSortable
                    list={layersInfo}
                    setList={(newState) => setDrag(newState)}
                    onEnd={(e) => Drop(e)}
                  >
                    {layersInfo.map((item, index) => (
                      <div className="layercontainer">
                        <div className="main1">
                          <div
                            className={
                              layerIndex == index
                                ? "mainlayercard active"
                                : "mainlayercard"
                            }
                            onClick={() => selectLayer(index)}
                          >
                            <img className="iconList" src={Icon}></img>
                            {item.images.length != 0 ? (
                              <img
                                className="innerimgdata"
                                src={item.images[0].storage_location}
                              ></img>
                            ) : (
                              <img className="innerimgdata" src={blank}></img>
                            )}
                            {layerIndex == index ? (
                              <input
                                value={item.layer_name}
                                onChange={(event) =>
                                  updateLayerName(
                                    event.target.value,
                                    item,
                                    index,
                                    true
                                  )
                                }
                                className="namebox"
                              ></input>
                            ) : (
                              <p className="itemName">{item.layer_name}</p>
                            )}
                          </div>
                        </div>
                        <div className="main2">
                          <img
                            className="delete_icon"
                            src={Delete}
                            onClick={() => deleteLayer(item)}
                          ></img>
                        </div>
                      </div>
                    ))}
                  </ReactSortable>
                </div>
                <br></br>
              </div>
              <div className="space_art1"></div>
              <div className="layerfooter">
                <button
                  className="layerbuttongenerate"
                  onClick={() => genCollection()}
                >
                  <img className="cl_gc_btn_icons" src={GC_img}></img>
                  Generate Collection
                </button>
                {showDownloadBTN == true && (
                  <button
                    className="layerbuttondownload"
                    onClick={() => downloadCollection()}
                  >
                    Download Collection
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space_art"></div>
    </>
  );
}
function mapStateToProps(state) {
  return {
    getImages: state.getImages,
    Showmodal: state.Showmodal,
    isAuth: state.isAuth,
    LoadApi: state.LoadApi,
  };
}

export default connect(mapStateToProps)(ArtWizardMain);
