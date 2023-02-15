import React, { useEffect, useState } from "react";
import DynamicAttribute from "../../components/DynamicAttribute/DynamicAttribute";
import "./CustomNft.css";
import DashboardHeader from "../../pages/Dashboard/subcomponents/header/header";
import { BREAD_CRUMD_DATA } from "../../utils/globals";
import { useHistory,useParams } from "react-router-dom";
import { connect } from 'react-redux';
import { setToast, setToastLoader } from "../../redux/actions/actions";
import ApiService from "../../services/apiService";
import { CUSTOM_NFT } from "../../utils/api_constants";
function CustomNft(props) {
  const history = useHistory()
  const api=new ApiService()
  const params=useParams()
  const [payload, setPayload] = useState([{
    project_id: { value: "", valid: false,required:false },
    name: { value: "", valid: false,required:false },
    attributes: [],
    description: { value: "", valid: false,required:true },
    external_url: { value: "", valid: false,required:false },
    royalty: { value: "", valid: false,required:true },
    file: { value: "", valid: false,required:true },
  }])

  const [attributeForm, setAttributeForm] = useState([
    { TraitType: "Trait Type", traitValue: "", Value: "value", value: "" },
  ]);



  useEffect(() => {
    if (!props.isAuth) {
        history.push("/login")
    }
  }, [props])



  const setInput = (val, obj) => {
    payload[0][obj].value = val;
    payload[0][obj].value != "" ? payload[0][obj].valid = true : payload[0][obj].valid = false
    setPayload([ ...payload ])
  }

  const addNft = () => {
    result == null ? payload[0]["file"].valid = false : payload[0]["file"].valid = true;
    result == null ? payload[0]["file"].value = "" : payload[0]["file"].value = payload[0]["file"].value;
    let attributes_lists=[]
    attributeForm.map((x)=>{
      x.valid=false
      if(x.traitValue!="" && x.value!=""){
        x.valid=true
      }

      attributes_lists.push({value:x.value,trait_type:x.traitValue,valid:x.valid})
    })
 
    let filter=payload.filter((x)=>x.name.valid==true && x.description.valid==true && x.royalty.valid==true)



    if(filter.length==0){
      if(payload[0].name.valid==false){
        props.dispatch(setToast("Enter NFT Name"))
      }
      else if (payload[0].description.valid==false){
        props.dispatch(setToast("Enter Description"))
      }
      else if(payload[0].royalty.valid==false){
        props.dispatch(setToast("Enter Royalty"))
      }
      else if(result==null){
        props.dispatch(setToast("Upload Image"))
      }
    }
    else{
      let attributeFormsData=attributes_lists.filter((x)=>x.valid==true)
    

      const formData = new FormData();
      formData.append("name",payload[0].name.value)
      formData.append("project_id",params.id)
      formData.append("description",payload[0].description.value)
      formData.append("external_url",payload[0].external_url.value)
      formData.append("file[]",payload[0].file.value);
      formData.append("royalty",payload[0].royalty.value)
      formData.append("attributes",attributeFormsData)
      if(result.length!=0){
        api.postRequest(CUSTOM_NFT,formData).then((response)=>{
          props.dispatch(setToastLoader("NFT Added Successfully"))
          history.push("/dashboard")
        }).catch((err)=>{
          props.dispatch(setToast("Server Error"))
        })
      }
      else{
        props.dispatch(setToast("Upload NFT Image"))
      }
    }


  }


  const addElement = () => {
    let data = {
      TraitType: "Trait Type",
      traitValue: "",
      Value: "value",
      value: "",
    };

    attributeForm.push(data);
    setAttributeForm([...attributeForm]);
  };

  const removeAttribute = (index) => {
    attributeForm.splice(index, 1);
    setAttributeForm([...attributeForm]);
  };

  const [image, setImage] = React.useState("");
  const imageRef = React.useRef(null);

  function useDisplayImage() {
    const [result, setResult] = React.useState("");
    function uploader(e) {
      setResult("")
      const imageFile = e.target.files[0];
      payload[0]["file"].value = imageFile;
      payload[0]["file"].valid = true;
      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        setResult(e.target.result);
      });

      reader.readAsDataURL(imageFile);
    }

    function clearImage() {
      setResult("")
    }

    return { result, uploader, clearImage };
  }

  const changeAttribute = (index,name,value)=>{
    
    attributeForm[index][name]=value;

  }

  const { result, uploader, clearImage } = useDisplayImage();

  return (
    <>
      <DashboardHeader DATA={BREAD_CRUMD_DATA.NFT}></DashboardHeader>

      <div className="custom_nft_div">
        <div className="custom_nft_content">
          <h4>Manually Upload an NFT</h4>
          <p>
            Add 1/1s & Customs - Use this tool to manually add an NFT to your
            collection.
            <br />
            We recommend using the NFT Generator Tool to bulk create NFTs from
            your layers & attribute images.
          </p>
          <div className="custom_nft_choose_div">
            <h3 className="custom_nft_choose_heading">Upload NFT Media</h3>

            <label className="custom_nft_choose_btn">
              Choose Files
              <input
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  uploader(e);
                }}
                className="type_file"
                type="file"
                size="60"
              />
            </label>
            <p>
              Max file size per file is 12 mb. We recommend an image atleast
              1024x1024px.
              <br />
              Video files are also accepted.
            </p>
          </div>
          {result && (
            <>
              <div className="custom_nft_img_prev">

                {" "}
                <img className="custom_nft_img" ref={imageRef} src={result} alt="" />
                <div>
                  <p>image/jpeg<br />1 file<br />2.0 mb</p>
                  <button onClick={() => clearImage()} className="custom_nft_del_btn">Delete</button>
                </div>
              </div>
            </>

          )}
          <div className="nft_meta">
            <h4>NFT Meta Data</h4>
            <p>
              Add 1/1s & Customs - Use this tool to manually add an NFT to your
              collection.
            </p>

            <div className="form">
              <div className="form_container">
                <div className="">
                  <p>
                    NFT Name<span className="asterix">*</span>
                    <span className="span_text">The title of your NFT</span>
                  </p>
                </div>
                <input onChange={(e) => setInput(e.target.value, "name")}
                  placeholder="NFT Name"
                  type="text"
                  className="inputs"
                />
              </div>

            </div>

            <DynamicAttribute
              attribute={attributeForm}
              addElement={addElement}
              changeAttribute={changeAttribute}
              removeAttribute={removeAttribute}
            ></DynamicAttribute>

            <div className="form">
              <div className="form_container">
                <div className="">
                  <p>
                    Description<span className="asterix">*</span>
                  </p>
                </div>
                <textarea className="text-area" placeholder="Description" onChange={(e) => setInput(e.target.value, "description")} />
              </div>
            </div>

            <div className="form">
              <div className="form_container">
                <div className="">
                  <p>
                    Royality Fee %<span className="asterix">*</span>
                    <span className="span_text">The title of your NFT</span>
                  </p>
                </div>
                <input
                  placeholder="Royalty Fee"
                  type="text"
                  className="inputs2" onChange={(e) => setInput(e.target.value, "royalty")}
                />
              </div>
              <div className="form_container2">
                <div className="">
                  <p>External URL</p>
                </div>
                <input onChange={(e) => setInput(e.target.value, "external_url")}
                  placeholder="External Url"

                  className="inputs2"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="custom_nft_btns_div">
          <button className="custom_nft_btn1">Cancel</button>
          <button className="custom_nft_btn2" onClick={() => addNft()}>Add NFT to Collection</button>
        </div>
      </div>
      <div className="space"></div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    isAuth: state.isAuth
  };
}

export default connect(mapStateToProps)(CustomNft);
