import axios from "axios";
// import config from "../../../common/config";
import {message} from "antd"

const baseURL = process.env.REACT_APP_BASE_API;



const base = async(options, headerOptions) => {
var token = localStorage.getItem("token");

  return axios({
    baseURL,
    headers: {
      Accept: "application/json",
      ...headerOptions,
      Authorization: token ? `Bearer ${token}` : null,
    },
    ...options,
  }).then((res) => res.data).catch((er)=>{
    console.log(er.response.status,"error")
    if(er.response.status!== 200){
      message.warning(er?.response?.data?.message)
      console.log("errorrrrr",er.response)
    }
  })
};

export const get = (url, params) => {
  const options = {
    method: "get",
    url,
    params,
  };
  return base(options);
};

export const patch = (url, data) => {
  const options = {
    method: "patch",
    url,
    data,
  };
  return base(options);
};

export const post = (url, data, headerOptions) => {
  const options = {
    method: "post",
    url,
    data,
  };
  return base(options, headerOptions);
};

export const put = (url, data) => {
  const options = {
    method: "put",
    url,
    data,
  };
  return base(options);
};

export const del = (url, data) => {
  const options = {
    method: "delete",
    url,
    data,
  };
  return base(options);
};
