import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import iconClose from "../../images/iconclose.png";
import { useHistory } from "react-router-dom";
import Dropdown from "../../components/dropdown/dropdown";
import {
  ADD_PROJECTS_ROUTE,
  GET_PROJECT_PAYLOADS,
  GET_PROJECT_ROUTE,
  UPDATE_PROJECT_ROUTE,
} from "../../utils/api_constants";
import { drops, FAQ_CONTENT } from "../../utils/globals";
import DateTimePicker from "react-datetime-picker";
import "./createproject.css";
import { setLoader, setToast, setToastLoader } from "../../redux/actions/actions";
import ApiService from "../../services/apiService";
import { useParams } from "react-router-dom";

function ProjectComponent(props) {
  const dispatch = useDispatch();
  const api = new ApiService();
  const history = useHistory();

  const [focused, setFocused] = React.useState(false)
  const onFocus = () => setFocused(true)
  const onBlur = () => {
    setTimeout(() => {
      setFocused(false)
    }, 250);
  }
  const [pageInput, setPageInput] = useState([
    {
      input: [
        {
          name: "Block Chain",
          value: "",
          label: "blockchain",
          valid: false,
          showAsterix: true,
          ShowInfo: true,
          className: "inputLabel1",
          type: "number",
          info_icon: false,
          required: false,

        },
        {
          name: "External Url",
          value: "",
          label: "external_url",
          valid: false,
          showAsterix: true,
          ShowInfo: true,
          className: "inputLabel2",
          type: "string",
          info_icon: true,
          info_text: "Eg. website url, or twitter",
          required: false,
          showInput: false,
        },
      ],
      drop: true,
      split: true,
      className: "InputHalf",
      showInput: false,
    },
    {
      input: [
        {
          name: "Project Name",
          value: "",
          label: "project_name",
          valid: false,
          showAsterix: true,
          ShowInfo: true,
          type: "string",

          info_icon: false,
          required: true,
        },
      ],
      drop: true,
      split: false,
      showInput: false,
      className: "InputFull",
    },

    {
      input: [
        {
          name: "Add Description",
          value: "",
          label: "description",
          valid: false,
          showAsterix: false,
          ShowInfo: true,
          type: "string",
          info_icon: false,
          required: false,
        },
      ],
      showInput: true,
      drop: true,
      split: false,
      className: "InputFull",
    },
    {
      input: [
        {
          name: "Symbol",
          value: "",
          label: "symbol",
          valid: false,
          showAsterix: true,
          ShowInfo: true,

          type: "string",
          info_icon: true,
          info_text: "Eg. website url, or twitter",
          required: false,
        },
      ],
      drop: true,
      showInput: false,
      split: false,
      className: "InputFull",
    },
    {
      input: [
        {
          name: "Total Supply",
          value: "",
          label: "total_supply",
          valid: false,
          showAsterix: true,
          ShowInfo: true,
          className: "inputLabel1",
          type: "number",
          info_icon: false,
          required: true,
        },
        {
          name: "Mint Price",
          value: "",
          label: "mint_price",
          valid: false,
          showAsterix: true,
          ShowInfo: true,
          className: "inputLabel2",
          type: "number",
          info_icon: false,
          required: true,
        },
      ],
      drop: true,
      split: true,
      showInput: false,
      className: "InputHalf",
    },

    {
      input: [
        {
          name: "Max Mint Wallet",
          value: "",
          label: "max_mint_limit",
          valid: false,
          showAsterix: true,
          ShowInfo: true,
          className: "inputLabel1",
          type: "number",
          info_icon: false,
          required: false,
        },
        {
          name: "Launch Date",
          value: "",
          label: "launch_date",
          valid: false,
          showAsterix: true,
          ShowInfo: true,
          className: "inputLabel2",
          info_icon: false,
          required: true,
        },
      ],
      drop: true,
      showInput: false,
      split: true,
      className: "InputHalf",
    },
  ]);

  const [value, setDate] = useState(new Date());
  const [preSalevalue, setPre] = useState(new Date());
  const [tabBlock, setTabBlock] = useState(1);
  const [expand, setExpand] = useState(false);
  const onSelectBlockChain = (index) => {
    setTabBlock(index);
    setExpand(false);


  };

console.log('tabBlock',tabBlock);
console.log('drops[tabBlock]',drops[tabBlock].id);

  useEffect(() => {
    if (drops[tabBlock].id == 1 || drops[tabBlock].id == 5) {
      pageInput[2].showInput = false;
      pageInput[3].showInput = false;
    // }
    // else if (drops[tabBlock].id == 5) {
    //   pageInput[2].showInput = false
    }
    else {
      pageInput[2].showInput = true;
      pageInput[3].showInput = true;
    }
    setPageInput([...pageInput])
  }, [tabBlock])

  const [page, setPage] = useState(1);
  const [accordion, setAccordion] = useState([
    {
      name: "Mint Fund",
      accordionTrigger: false,
    },

    {
      name: "Whitelist/Pre-Sale",
      accordionTrigger: false,
      maxMintPerWallet: "",
    },
    {
      name: "Royality",
      accordionTrigger: false,
      maxMintPerWallet: "",
    },
  ]);

  const params = useParams()
  useEffect(() => {
    if (props.flag == "edit") {
      GET_PROJECT_PAYLOADS.project_id = params.id;
      dispatch(setLoader(true))
      api.postRequest(GET_PROJECT_ROUTE, GET_PROJECT_PAYLOADS).then((response) => {
        let index = drops.findIndex((x) => x.label == response.data.blockchain);
        setTabBlock(index)
        pageInput[5].input[1].value = response.data.launch_date
        pageInput[1].input[0].value = response.data.project_name
        pageInput[3].input[0].value = response.data.symbol
        pageInput[4].input[0].value = response.data.total_supply
        pageInput[4].input[1].value = response.data.mint_price
        pageInput[5].input[0].value = response.data.max_mint_limit
        pageInput[0].input[1].value = response.data.external_url
        whitelistINput.presale_discount_price = response.data.presale_discount_price
        whitelistINput.presale_max_mint_limit = response.data.presale_max_mint_limit
        whitelistINput.presale_launch_date = new Date(response.data.presale_launch_date)
        setWhiteListInput({ ...whitelistINput })
        setRoyaltyPercentage(response.data.royalty_percentage)
        mintForm[0].addressValue=response.data.mint_fund_addr1
        mintForm[0].percentagevalue=response.data.mint_fund_addr1_perc
        royaltyForm[0].AddressValue=response.data.royalty_addr1
        royaltyForm[0].labelsharevalue=response.data.royalty_addr1_perc
        checkMintL(response.data);
        checkRoyaltyL(response.data)
        setPageInput([...pageInput])
        setDate(new Date(response.data.launch_date))
        setPre(new Date(response.data.presale_launch_date))
        dispatch(setLoader(false))
      }).catch((error)=>{
      dispatch(setLoader(false))
      })


    }


  }, [])





  const checkMintL = (mint) => {
    if (mint.mint_count == 2) {
      mintForm.push({
        addressName: "Address",
        addressValue: mint.mint_fund_addr2,
        addressRequired: true,
        addressType: "string",
        percentageName: "percentage",
        percentageRequired: true,
        percentagevalue: mint.mint_fund_addr2_perc,
        percentageType: "number",
      })
    }
    else if (mint.mint_count == 3) {
      mintForm.push({
        addressName: "Address",
        addressValue: mint.mint_fund_addr2,
        addressRequired: true,
        addressType: "string",
        percentageName: "percentage",
        percentageRequired: true,
        percentagevalue: mint.mint_fund_addr2_perc,
        percentageType: "number",
      },
        {
          addressName: "Address",
          addressValue: mint.mint_fund_addr3,
          addressRequired: true,
          addressType: "string",
          percentageName: "percentage",
          percentageRequired: true,
          percentagevalue: mint.mint_fund_addr3_perc,
          percentageType: "number",
        })
    }
    else if (mint.mint_count == 4) {
      mintForm.push({
        addressName: "Address",
        addressValue: mint.mint_fund_addr2,
        addressRequired: true,
        addressType: "string",
        percentageName: "percentage",
        percentageRequired: true,
        percentagevalue: mint.mint_fund_addr2_perc,
        percentageType: "number",
      },
        {
          addressName: "Address",
          addressValue: mint.mint_fund_addr3,
          addressRequired: true,
          addressType: "string",
          percentageName: "percentage",
          percentageRequired: true,
          percentagevalue: mint.mint_fund_addr3_perc,
          percentageType: "number",
        },
        {
          addressName: "Address",
          addressValue: mint.mint_fund_addr4,
          addressRequired: true,
          addressType: "string",
          percentageName: "percentage",
          percentageRequired: true,
          percentagevalue: mint.mint_fund_addr4_perc,
          percentageType: "number",
        })
    }

    setMintForm([...mintForm])
  }

  const checkRoyaltyL = (royalty) => {


    if (royalty.royalty_count == 4) {
      royaltyForm.push(
        {
          Address: "Address",
          place: "5%",
          addressType: "string",
          AddressValue: royalty.royalty_addr2,
          labelshare: "Royality Share",
          labelshareType: "number",
          labelsharevalue: royalty.royalty_addr2_perc,
          Royalitylabel: "RoyaltyPercentage",
          RoyaltyValue: "",
          RoyalityValueType: "number",
          AddressRequired: true,
          RoyalityValueRequired: true,
          RoyalitylabelRequired: false,
          AddressInfoIcon: false,
          RoyalityValueInfoIcon: true,
          RoyalitylabelInfoIcon: true,
        },

        {
          Address: "Address",
          place: "5%",
          addressType: "string",
          AddressValue: royalty.royalty_addr3,
          labelshare: "Royality Share",
          labelshareType: "number",
          labelsharevalue: royalty.royalty_addr3_perc,
          Royalitylabel: "RoyaltyPercentage",
          RoyaltyValue: "",
          RoyalityValueType: "number",
          AddressRequired: true,
          RoyalityValueRequired: true,
          RoyalitylabelRequired: false,
          AddressInfoIcon: false,
          RoyalityValueInfoIcon: true,
          RoyalitylabelInfoIcon: true,
        },
        {
          Address: "Address",
          place: "5%",
          addressType: "string",
          AddressValue: royalty.royalty_addr4,
          labelshare: "Royality Share",
          labelshareType: "number",
          labelsharevalue: royalty.royalty_addr4_perc,
          Royalitylabel: "RoyaltyPercentage",
          RoyaltyValue: "",
          RoyalityValueType: "number",
          AddressRequired: true,
          RoyalityValueRequired: true,
          RoyalitylabelRequired: false,
          AddressInfoIcon: false,
          RoyalityValueInfoIcon: true,
          RoyalitylabelInfoIcon: true,
        },



      )
    }
    else if(royalty.royalty_count == 3){
      royaltyForm.push(
        {
          Address: "Address",
          place: "5%",
          addressType: "string",
          AddressValue: royalty.royalty_addr2,
          labelshare: "Royality Share",
          labelshareType: "number",
          labelsharevalue: royalty.royalty_addr2_perc,
          Royalitylabel: "RoyaltyPercentage",
          RoyaltyValue: "",
          RoyalityValueType: "number",
          AddressRequired: true,
          RoyalityValueRequired: true,
          RoyalitylabelRequired: false,
          AddressInfoIcon: false,
          RoyalityValueInfoIcon: true,
          RoyalitylabelInfoIcon: true,
        },

        {
          Address: "Address",
          place: "5%",
          addressType: "string",
          AddressValue: royalty.royalty_addr3,
          labelshare: "Royality Share",
          labelshareType: "number",
          labelsharevalue: royalty.royalty_addr3_perc,
          Royalitylabel: "RoyaltyPercentage",
          RoyaltyValue: "",
          RoyalityValueType: "number",
          AddressRequired: true,
          RoyalityValueRequired: true,
          RoyalitylabelRequired: false,
          AddressInfoIcon: false,
          RoyalityValueInfoIcon: true,
          RoyalitylabelInfoIcon: true,
        }



      )
    }
    else if(royalty.royalty_count == 2){
      royaltyForm.push(
        {
          Address: "Address",
          place: "5%",
          addressType: "string",
          AddressValue: royalty.royalty_addr2,
          labelshare: "Royality Share",
          labelshareType: "number",
          labelsharevalue: royalty.royalty_addr2_perc,
          Royalitylabel: "RoyaltyPercentage",
          RoyaltyValue: "",
          RoyalityValueType: "number",
          AddressRequired: true,
          RoyalityValueRequired: true,
          RoyalitylabelRequired: false,
          AddressInfoIcon: false,
          RoyalityValueInfoIcon: true,
          RoyalitylabelInfoIcon: true,
        })
    }
    setRoyality([...royaltyForm])
  }



  const selectInput = (drop) => {
    if (drop) {
      if (expand) {
        setExpand(false);
      } else {
        setExpand(true);
      }
    }
  };

  const [mintForm, setMintForm] = useState([
    {
      addressName: "Address",
      addressValue: "",
      addressRequired: true,
      addressType: "string",
      percentageName: "Percentage",
      percentageRequired: true,
      percentagevalue: "",
      percentageType: "number",
    },
  ]);

  const [royaltyForm, setRoyality] = useState([
    {
      Address: "Address",
      place: "5%",
      addressType: "string",
      AddressValue: "",
      labelshare: "Royality Share",
      labelshareType: "number",
      labelsharevalue: "",
      Royalitylabel: "RoyaltyPercentage",
      RoyaltyValue: "",
      RoyalityValueType: "number",
      AddressRequired: true,
      RoyalityValueRequired: true,
      RoyalitylabelRequired: false,
      AddressInfoIcon: false,
      RoyalityValueInfoIcon: true,
      RoyalitylabelInfoIcon: true,
    },
  ]);

  const onRoyaltyPercentageChange = (i, e) => {
    royaltyForm[i].labelsharevalue = e;
    if (royaltyForm[i].labelshareType == "number") {
      if (!isNaN(royaltyForm[i].labelsharevalue) == false) {

        return;
      }
    }

    setRoyality([...royaltyForm]);
  };

  const handleAccordion = (index, name) => {
    accordion.map((x) => {
      if (x.name != name) {
        x.accordionTrigger = false;
      }
    });

    if (accordion[index].accordionTrigger) {
      accordion[index].accordionTrigger = false;
    } else {
      accordion[index].accordionTrigger = true;
    }
    setAccordion([...accordion]);
  };

  const addMore = () => {
    let data = {
      addressName: "Address",
      addressValue: "",
      percentageName: "percentage",
      percentagevalue: "",
      addressRequired: true,
      percentageRequired: true,
    };

    if (mintForm.length <= 3) {
      mintForm.push(data)
      setMintForm([...mintForm])
    }



  };

  const deleteRow = (index) => {
    if (index != 0) {
      mintForm.splice(index, 1);
      setMintForm([...mintForm]);
    }
  };

  const addMoreRoyalty = () => {
    let data = {
      Address: "Address",
      place: "5%",
      AddressValue: "",
      labelshare: "Royality Share",
      labelsharevalue: "",
      Royalitylabel: "RoyaltyPercentage",
      RoyaltyValue: "",
      AddressRequired: true,
      RoyalityValueRequired: true,
      RoyalitylabelRequired: false,
      AddressInfoIcon: false,
      RoyalityValueInfoIcon: true,
      RoyalitylabelInfoIcon: true,
    };
    royaltyForm.push(data);
    setRoyality([...royaltyForm]);
  };

  const deleteRowRoyalty = (index) => {
    if (index != 0) {
      royaltyForm.splice(index, 1);
      setRoyality([...royaltyForm]);
    }
  };

  const onRChange = (e) => {
    if (!isNaN(e) == false) {

      return;
    }
    setRoyaltyPercentage(e);
  };


  const [royaltyPercentage, setRoyaltyPercentage] = useState("");

  const onRoyaltyAddressChange = (i, e) => {

    royaltyForm[i].AddressValue = e;
    setRoyality([...royaltyForm]);
  };
  const onChangeMintAddress = (e, i) => {

    mintForm[i].addressValue = e;

    setMintForm([...mintForm]);
  };

  const onChangeMintPercentage = (e, i) => {

    mintForm[i].percentagevalue = e;

    if (mintForm[i].percentageType == "number") {
      if (!isNaN(mintForm[i].percentagevalue) == false) {

        return;
      }
    }

    setMintForm([...mintForm]);
  };

  const [whitelistINput, setWhiteListInput] = useState({
    presale_discount_price: "",
    presale_launch_date: value,
    presale_max_mint_limit: "",
  });

  const onChangeMain = (e, main, index) => {
    pageInput[main].input[index].value = e.target.value;
    setExpand(false)
    if (pageInput[main].input[index].type == "number") {
      if (!isNaN(pageInput[main].input[index].value) == false) {

        return;
      }
    }

    setPageInput([...pageInput]);

  };

  const createProjects = () => {



    let payload = {
      blockchain: drops[tabBlock].value,
      project_name: pageInput[1].input[0].value != "" ? pageInput[1].input[0].value : null,
      external_url: pageInput[0].input[1].value != "" ? pageInput[0].input[1].value : null,
      project_desc: pageInput[2].input[0].value != "" ? pageInput[2].input[0].value : "",
      symbol: pageInput[3].input[0].value != "" ? pageInput[3].input[0].value : null,
      total_supply: pageInput[4].input[0].value != "" ? parseFloat(pageInput[4].input[0].value) : null,
      mint_price: pageInput[4].input[1].value != "" ? parseFloat(pageInput[4].input[1].value) : null,
      max_mint_limit: pageInput[5].input[0].value != "" ? parseFloat(pageInput[5].input[0].value) : null,
      launch_date: value != "" ? value : null,
      mint_fund_addr1: mintForm[0].addressValue != "" ? mintForm[0].addressValue : "",
      mint_fund_addr2: mintForm.length >= 2 ? mintForm[1].addressValue : "",
      mint_fund_addr3: mintForm.length >= 3 ? mintForm[2].addressValue : "",
      mint_fund_addr4: mintForm.length >= 4 ? mintForm[3].addressValue : "",
      mint_fund_addr1_perc: mintForm[0].percentagevalue != "" ? parseFloat(mintForm[0].percentagevalue) : null,
      mint_fund_addr2_perc: mintForm.length >= 2 ? mintForm[1].percentagevalue != "" ? parseFloat(mintForm[1].percentagevalue) : null : null,
      mint_fund_addr3_perc: mintForm.length >= 3 ? mintForm[2].percentagevalue != "" ? parseFloat(mintForm[2].percentagevalue) : null : null,
      mint_fund_addr4_perc: mintForm.length >= 4 ? mintForm[3].percentagevalue != "" ? parseFloat(mintForm[3].percentagevalue) : null : null,
      presale_discount_price: whitelistINput.presale_discount_price != "" ? parseFloat(whitelistINput.presale_discount_price) : null,
      presale_launch_date: preSalevalue != "" ? preSalevalue : null,
      presale_max_mint_limit: whitelistINput.presale_max_mint_limit != "" ? parseFloat(whitelistINput.presale_max_mint_limit) : null,
      royalty_percentage: royaltyPercentage != "" ? parseFloat(royaltyPercentage) : null,
      royalty_addr1: royaltyForm[0].AddressValue != "" ? royaltyForm[0].AddressValue : "",
      royalty_addr2: royaltyForm.length >= 2 ? royaltyForm[1].AddressValue : "",
      royalty_addr3: royaltyForm.length >= 3 ? royaltyForm[2].AddressValue : "",
      royalty_addr4: royaltyForm.length >= 4 ? royaltyForm[3].AddressValue : "",
      royalty_addr1_perc: royaltyForm[0].labelsharevalue != "" ? parseFloat(royaltyForm[0].labelsharevalue) : null,
      royalty_addr2_perc: royaltyForm.length >= 2 ? royaltyForm[1].labelsharevalue != "" ? parseFloat(royaltyForm[1].labelsharevalue) : null : null,
      royalty_addr3_perc: royaltyForm.length >= 3 ? royaltyForm[2].labelsharevalue != "" ? parseFloat(royaltyForm[2].labelsharevalue) : null : null,
      royalty_addr4_perc: royaltyForm.length >= 4 ? royaltyForm[3].labelsharevalue != "" ? parseFloat(royaltyForm[3].labelsharevalue) : null : null,
      project_status: 'Active',
      user_id: localStorage.getItem("id"),
      mint_count: mintForm.length,
      royalty_count: royaltyForm.length
    }
    let flag = checkValid(payload);
    if (props.flag == "create") {
      if (flag) {
        api
          .postRequest(ADD_PROJECTS_ROUTE, payload)
          .then(() => {
            dispatch(setToastLoader("Project added Successfully"));
            history.goBack();
          })
          .catch((error) => {
            dispatch(setToast("Server Error"));
          });
      }

    }
    else {
      if (flag) {
        payload.project_id = params.id;
        api
          .updateRequest(UPDATE_PROJECT_ROUTE, payload)
          .then(() => {
            dispatch(setToastLoader("Update Project Successfully completed"));
            history.goBack();
          })
          .catch((error) => {
            dispatch(setToast("Server Error"));
          });
      }
    }
  };



  const checkValid = (payload) => {
    console.log(payload)
    if (payload.blockchain == null) {
      dispatch(setToast(" block chain not entered"));
      return false;
    } 
    // else if (payload.external_url == null) {
    //   dispatch(setToast("External Url is not entered"));
    //   return false;
    // } 
    else if (payload.project_name == null) {
      dispatch(setToast("Project Name is not entered"));
      return false;
    } 
    // else if (payload.symbol == null) {
    //   dispatch(setToast("Symbol is not entered"));
    //   return false;
    // } 
    else if (payload.total_supply == null) {
      dispatch(setToast("Total Supply is not entered"));
      return false;
    } else if (payload.mint_price == null) {
      dispatch(setToast("Mint Price is not entered"));
      return false;
    } 
    // else if (payload.max_mint_limit == null) {
    //   dispatch(setToast("Max Mint Limit is not entered"));
    //   return false;
    // } 
    else if (payload.launch_date == null) {
      dispatch(setToast("Launch Date is not entered"));
      return false;
    }

    else if (payload.mint_fund_addr1 == "" && mintForm[0] && mintForm[0].addressValue == "") {
      console.log(mintForm[0]);
      dispatch(setToast("Mint Fund Address 1 is not entered"));

      return;
    }

    else if (payload.mint_fund_addr1_perc == null && mintForm[0] && mintForm[0].percentagevalue != null) {
      dispatch(setToast("Mint Fund Percentage 1 is not entered"));
      return;
    }

    else if (payload.mint_fund_addr2 == "" && mintForm[1] && mintForm[1].addressValue == "") {
      dispatch(setToast("Mint Fund Address 2 is not entered"));
      return;
    }
    else if (payload.mint_fund_addr2_perc == null && mintForm[1] && mintForm[1].percentagevalue != null) {
      dispatch(setToast("Mint Fund Address 2 Percentage is not entered"));
      return;
    }
    else if (payload.mint_fund_addr3 == "" && mintForm[2] && mintForm[2].addressValue == "") {
      dispatch(setToast("Mint Fund Address 3 is not entered"));
      return;
    }
    else if (payload.mint_fund_addr3_perc == null && mintForm[2] && mintForm[2].percentagevalue != null) {
      dispatch(setToast("Mint Fund Address Percentage 3 is not entered"));
      return;
    }
    else if (payload.mint_fund_addr4 == "" && mintForm[3] && mintForm[3].addressValue == "") {
      dispatch(setToast("Mint Fund Address 4 is not entered"));
      return;
    }

    else if (payload.mint_fund_addr4_perc == null && mintForm[3] && mintForm[3].percentagevalue != null) {
      dispatch(setToast("Mint Fund Address Percentage 4 is not entered"));
      return;
    }
    
    // else if (payload.presale_discount_price == null) {
    //   dispatch(setToast("Presale Discount Price is not entered"));
    //   return;
    // }
     else if (payload.presale_launch_date == null) {
      dispatch(setToast("Presale Launch Date is not entered"));
      return;
    } else if (payload.presale_max_mint_limit == null) {
      dispatch(setToast("Pre sale Max Mint Wallet is not entered"));
      return;
    } else if (payload.project_desc == null) {
      dispatch(setToast("Project Description is not entered"));
      return;
    }
    // else if (payload.royalty_percentage == null) {
    //   dispatch(setToast("Royalty Percentage is not entered"));
    //   return;
    // }

     else if (payload.royalty_percentage > 100) {
      dispatch(setToast("Royalty Percentage should not more than 100%"));
      return;
    }

    else if (payload.user_id == null) {
      dispatch(setToast("User ID is not entered"));
      return;
    }


    else if ( royaltyForm[0] && royaltyForm[0].labelsharevalue > 100) {
      dispatch(setToast("Royalty Share should not more than 100%"));
      return;
    }

    else if ( royaltyForm[1] && royaltyForm[1].labelsharevalue > 100) {
      dispatch(setToast("Royalty Share should not more than 100%"));
      return;
    }

    else if ( royaltyForm[2] && royaltyForm[2].labelsharevalue > 100) {
      dispatch(setToast("Royalty Share should not more than 100%"));
      return;
    }

    else if ( royaltyForm[3] && royaltyForm[3].labelsharevalue > 100) {
      dispatch(setToast("Royalty Share should not more than 100%"));
      return;
    }

    else if ( mintForm[0] && mintForm[0].percentagevalue > 100) {
      dispatch(setToast("Mint Value should not more than 100%"));
      return;
    }

    else if ( mintForm[1] && mintForm[1].percentagevalue > 100) {
      dispatch(setToast("Mint Value should not more than 100%"));
      return;
    }

    else if ( mintForm[2] && mintForm[2].percentagevalue > 100) {
      dispatch(setToast("Mint Value should not more than 100%"));
      return;
    }

    else if ( mintForm[3] && mintForm[3].percentagevalue > 100) {
      dispatch(setToast("Mint Value should not more than 100%"));
      return;
    }




    // else  if(payload.project_status==null){
    //     dispatch(setToast("project Status is not entered"));
    //     return false;
    // }


    else if (payload.royalty_addr1 == "" && royaltyForm[0] && royaltyForm[0].AddressValue == "") {
      dispatch(setToast("royalty address 1 not entered"));
      return;
    }

    else if (payload.royalty_addr2 == "" && royaltyForm[1] && royaltyForm[1].AddressValue == "") {
      dispatch(setToast("royalty address 2 not entered"));
      return;
    }

    else if (payload.royalty_addr3 == "" && royaltyForm[2] && royaltyForm[2].AddressValue == "") {
      dispatch(setToast("royalty address 3 not entered"));
      return;
    }

    else if (payload.royalty_addr3 == "" && royaltyForm[3] && royaltyForm[3].AddressValue == "") {
      dispatch(setToast("royalty address 4 not entered"));
      return;
    }



    else if (payload.royalty_addr1_perc == null && royaltyForm[0] && royaltyForm[0].labelsharevalue != null) {
      dispatch(setToast("royalty share 1 not entered"));
      return;
    }

    else if (payload.royalty_addr2_perc == null && royaltyForm[1] && royaltyForm[1].labelsharevalue != null) {
      dispatch(setToast("royalty share 2 not entered"));
      return;
    }

    else if (payload.royalty_addr3_perc == null && royaltyForm[2] && royaltyForm[2].labelsharevalue != null) {
      dispatch(setToast("royalty share 3 not entered"));
      return;
    }

    else if (payload.royalty_addr4_perc == null && royaltyForm[3] && royaltyForm[3].labelsharevalue != null) {
      dispatch(setToast("royalty share 4 not entered"));
      return;
    }



    return true

  }

  const onChangeLaunch = (e, main, index) => {
    pageInput[main].input[index].value = e;
    setPageInput([...pageInput]);
    setDate(e);

  };

  const onWhiteList = (e, params) => {
    whitelistINput[params] = e;

    if (params == "presale_discount_price") {
      if (!isNaN(e) == false) {

        return;
      }
    } else if (params == "presale_max_mint_limit") {
      if (!isNaN(e) == false) {

        return;
      }
    }

    if (params == "presale_launch_date") {
      setPre(e);
    }

    setWhiteListInput({ ...whitelistINput });

  };
  return (
    <div className="create_project">

      <div className="centerform">
        <div className="headerbox">
          <div className="headcol1">{props.title}</div>
          <div className="headcol1">Step {page} of 2</div>
        </div>
        <div className="border"></div>
        <div className={page == 1 ? "page1" : ""}>
          {page == 1 && (
            <>
              {pageInput.map((input, main) =>
                input.split == true ? (
                  <div className="flexmain">
                    {input.input.map((data, index) => (
                      <>
                        <div className="col-half-first">
                          <p className={data.className}>
                            {data.name}
                            {data.required == true &&
                              <span className="asterix"> *</span>
                            }
                            {data.info_icon == true &&
                            <div class="tooltip">  <svg
                              
                            style={{ width: "22px", marginLeft: "10px", cursor: "pointer" }}
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
          
                            <span class="tooltiptext">{data.info_text}</span>
                          </div>
                          
                            // <div className="tooltip">
                            // <div className="toolTip">
                              // <svg
                              
                              //   style={{ width: "22px", marginLeft: "10px", cursor: "pointer" }}
                              //   xmlns="http://www.w3.org/2000/svg"
                              //   class="h-6 w-6"
                              //   fill="none"
                              //   viewBox="0 0 24 24"
                              //   stroke="currentColor"
                              //   stroke-width="2"
                              // >
                              //   <path
                              //     stroke-linecap="round"
                              //     stroke-linejoin="round"
                              //     d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              //   />
                              // </svg>
                            //   <span class="tooltipText">Tooltip text</span>

                            //   </div>
                              // </div>
                            }
                          </p>
                        </div>
                        <div className="col-half-first">
                          {data.label == "blockchain" ? (
                            <>
                              <input onFocus={onFocus} onBlur={onBlur}
                                className="inputHalf place"
                                value={drops[tabBlock].value}
                                onClick={() => selectInput(input.drop)}
                              ></input>
                              <div className="imginside">
                                <img
                                  onClick={() => expand(input.drop)}
                                  className="imgs"
                                  src={drops[tabBlock].imgurl}
                                ></img>
                              </div>
                            </>
                          ) : data.label == "launch_date" ? (
                            <DateTimePicker
                              value={value}
                              className="inputHalf"
                              onChange={(e) => onChangeLaunch(e, main, index)}
                            />
                          ) : (
                            <input
                              value={data.value}
                              onChange={(e) => onChangeMain(e, main, index)}
                              className={input.className}
                            ></input>
                          )}
                        </div>
                      </>
                    ))}
                  </div>
                ) : (
                  <>
                    {input.showInput == false && <div className="flexmain">
                      {input.input.map((data, index) => (
                        <>
                          <div className="col-half-second">
                            <p style={{ color: "white",cursor:"default" }}>
                              {data.name}
                              {data.required == true &&
                                <span className="asterix"> *</span>
                              }
                              {data.info_icon == true &&

                                <svg
                                  style={{ width: "22px", marginLeft: "10px" }}
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-6 w-6"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  stroke-width="2"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              }
                            </p>
                          </div>
                          <div className="col-half-second">
                            <input
                              value={data.value}
                              onChange={(e) => onChangeMain(e, main, index)}
                              className={input.className}
                            ></input>
                          </div>
                        </>
                      ))}
                    </div>}
                    {focused && (
                      <Dropdown
                        tabBlock={tabBlock}
                        onSelectBlockChain={onSelectBlockChain}
                        drops={drops}
                      ></Dropdown>
                    )}
                  </>
                )
              )}

            </>
          )}

          {page == 1 && <div className="flexend">

            <div className="buttonPrev" onClick={() => setPage(2)}>
            Save and Continue
            </div>
          </div>}
        </div>





        <div className={page == 2 ? "page2" : ""}>
          {page == 2 && (
            <div>
              {accordion.map((acc, index) => (
                <div className="accordion">
                  <div
                    className="accordionHeader"
                    onClick={() => handleAccordion(index, acc.name)}
                  >
                    <div className="accordionFlex">
                      <p className="titleform">{acc.name}</p>
                      {acc.accordion_trigger ? (
                        <img
                          alt="slide"
                          className="accordionIcon"
                          src={FAQ_CONTENT.accordionToggleUp}
                        ></img>
                      ) : (
                        <img
                          alt="slide"
                          className="accordionIcon"
                          src={FAQ_CONTENT.accordionToggleDown}
                        ></img>
                      )}
                    </div>
                  </div>

                  {acc.accordionTrigger == true && (
                    <div className="accordionbody">
                      {index == 1 && (
                        <div>
                          <div className="mintflex">
                            <div className="whitecol">
                              <p className="roylabel">
                                Discount Price
                                <div class="tooltip">  <svg
                              
style={{ width: "22px", marginLeft: "10px", cursor: "pointer" }}
xmlns="http://www.w3.org/2000/svg"
class="h-6 w-6"
fill="none"
viewBox="0 0 24 24"
stroke="currentColor"
stroke-width="2"
>
<path
  stroke-linecap="round"
  stroke-linejoin="round"
  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
/>
</svg>

<span class="tooltiptext">Discounted price for whitelist address/mint
</span>
</div>
                              </p>
                            </div>
                            <div className="whitecol">
                              <input
                                value={whitelistINput.presale_discount_price}
                                className="mintinput"
                                onChange={(e) =>
                                  onWhiteList(
                                    e.target.value,
                                    "presale_discount_price"
                                  )
                                }
                              ></input>
                            </div>
                            <div className="whitecol">
                              <p className="roylabel">Pre Sale Launch Date</p>
                            </div>
                            <div className="whitecol">
                              <DateTimePicker
                                value={whitelistINput.presale_launch_date}
                                className="inputHalf"
                                onChange={(e) =>
                                  onWhiteList(e, "presale_launch_date")
                                }
                              />
                            </div>
                          </div>
                          <div className="mintflex">
                            <div className="colnewflex">
                              <p style={{ fontSize: "18px", cursor : "default" }}>
                                Max Mint Per Wallet
                              </p>
                            </div>
                            <div className="colnewflex">
                              <input
                                value={whitelistINput.presale_max_mint_limit}
                                className="whiteinput"
                                onChange={(e) =>
                                  onWhiteList(
                                    e.target.value,
                                    "presale_max_mint_limit"
                                  )
                                }
                              ></input>
                            </div>
                          </div>
                        </div>
                      )}
                      {index == 0 && (
                        <div>
                          {mintForm.map((x, index) => (
                            <div className="mintflex">
                              <div className="mincol">
                                <p className="mintlabel">{x.addressName}
                                  {x.addressRequired == true &&
                                    <span className="asterix"> *</span>
                                  }
                                </p>
                              </div>
                              <div className="mincol">
                                <input
                                  value={x.addressValue}
                                  onChange={(e) =>
                                    onChangeMintAddress(e.target.value, index)
                                  }
                                  className="mintinput"
                                ></input>
                              </div>
                              <div className="mincol">
                                <p className="mintlabel">{x.percentageName}
                                  {x.percentageRequired == true &&
                                    <span className="asterix"> *</span>
                                  }</p>
                              </div>
                              <div className="mincol">
                                <input
                                  value={x.percentagevalue}
                                  className="mintinput"
                                  onChange={(e) =>
                                    onChangeMintPercentage(e.target.value, index)
                                  }
                                ></input>
                              </div>
                              <div
                                className="mincol"
                                onClick={() => deleteRow(index)}
                              >
                                <img className={`${index == 0 ? 'iconcLOSE hide_del' : 'iconcLOSE' }`} src={iconClose}></img>
                              </div>
                            </div>
                          ))}
                          <div className="addMore" onClick={() => addMore()}>
                            Add
                          </div>
                        </div>
                      )}
                      {index == 2 && (
                        <div>
                          <div className="mintflex">
                            <div className="colroyflex">
                              <p style={{ fontSize: "18px", cursor : "default" }}>
                                Royality Percentage
                                <div class="tooltip">  <svg
                              
                              style={{ width: "22px", marginLeft: "10px", cursor: "pointer" }}
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="2"
                              >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                              </svg>
                              
                              <span class="tooltiptext">Percentage from secondary sales</span>
                              </div>
                              </p>
                            </div>
                            <div className="colroyflex">
                              <input
                                value={royaltyPercentage}
                                onChange={(e) => onRChange(e.target.value)}
                                className="royinput"
                              ></input>
                            </div>
                          </div>
                          {royaltyForm.map((x, index) => (
                            <div className="mintflex">
                              <div className="roycol">
                                <p className="roylabel">{x.Address}
                                  {x.AddressRequired == true &&
                                    <span className="asterix"> *</span>
                                  }
                                </p>
                              </div>
                              <div className="roycol">
                                <input
                                  value={x.AddressValue}
                                  onChange={(e) =>
                                    onRoyaltyAddressChange(index, e.target.value)
                                  }
                                  className="mintinput"
                                ></input>
                              </div>
                              <div className="roycol">
                                <p style={{ width: "165px" , marginTop: "0px" }} className="roylabel">{x.labelshare}
                                  {x.RoyalityValueInfoIcon == true &&
                                    <p class="tooltip">  <svg
                              
                                    style={{ width: "22px", marginLeft: "10px", cursor: "pointer" }}
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                    </svg>
                                    
                                    <span class="tooltiptext">Should be out of 100%</span>
                                    </p>
                                  }
                                </p>
                              </div>
                              <div className="roycol">
                                <input
                                  value={x.labelsharevalue}
                                  onChange={(e) =>
                                    onRoyaltyPercentageChange(
                                      index,
                                      e.target.value
                                    )
                                  }
                                  className="mintinput"
                                ></input>
                              </div>
                              <div
                                className={`roycol`}
                                onClick={() => deleteRowRoyalty(index)}
                              >
                                <img className={`${index == 0 ? 'iconcLOSE hide_del' : 'iconcLOSE' }`} src={iconClose}></img>
                              </div>
                            </div>
                          ))}

                          <div
                            className="addMore"
                            onClick={() => addMoreRoyalty()}
                          >
                            Add
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {page == 2 && <div className="buttonflexmain">
            <div className="buttonPrev" onClick={() => setPage(1)}>
              Previous
            </div>
            <div className="buttonEnd" onClick={() => createProjects()}>
              Submit
            </div>
          </div>}
          <div className="spacemin"></div>
        </div>



      </div>
    </div>
  );
}



export default ProjectComponent;
