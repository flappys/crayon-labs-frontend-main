import React from "react";
import axios from "axios";
export default class ApiService extends React.Component {
  BASEURL = "http://13.233.91.138:3000";
  constructor(props) {
    super(props);
  }

  getRequest(endpoint) {
    return axios.get(endpoint);
  }

  postRequest(endpoint, payload) {
    let headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    return axios.post(endpoint, payload, { headers: headers });
  }

  uploadImage(endpoint, payload) {
    let headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    };

    return axios.post(endpoint, payload, { headers: headers });
  }

  updateRequest(endpoint, payload) {
    let headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    return axios.put(endpoint, payload, { headers: headers });
  }

  updateRequestForm(endpoint, payload) {
    let headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    };
    return axios.put(endpoint, payload, { headers: headers });
  }

  deleteRequest(endpoint, payload) {
    return axios.delete(endpoint, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },

      data: payload,
    });
  }

  deleteRequestUpload(endpoint, payload) {
    return axios.delete(endpoint, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },

      data: payload,
    });
  }

  parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }
}
