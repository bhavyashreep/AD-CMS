import {
  setStorageItem,
  getStorageItem,
  removeStorageItem,
} from "../../../infrastructure/common/local";
import { onLogin } from "../../../infrastructure/login";
import { routes } from "../../common/Routes/routes";
import { logError } from "../../common/Utils";
import firebase from "../../../config/api/firebase";
import { message } from "antd";

const auth = firebase.auth();
const adminData = firebase.database().ref("/admin");

const actions = {
  setToken:
    (newValue) =>
    ({ setState }) => {
      setState({ token: newValue });
    },
  setIsLogged:
    (newValue) =>
    ({ setState }) => {
      setState({ isLogged: newValue });
    },
  onSubmit:
    (values, history) =>
    async ({ dispatch }) => {
      delete values["remeber"];
      const loginRes = await onLogin(values);
      console.log("response login", loginRes);
      if (loginRes?.StatusCode === 6000) {
        const d = new Date();
        let time = d.getDate();
        let time2 = time + 5;

        localStorage.setItem("tokenTime", time);
        localStorage.setItem("expireTime", time2);

        history.push("/dashboard");

        localStorage.setItem("token", loginRes?.data?.access_token);
        console.log("response login", loginRes?.data?.access_token);
      }
    },
};

export default actions;
