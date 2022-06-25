import React, { useEffect } from "react";
import LoginContainer from "./components/LoginContainer";
import { getStorageItem } from "../../infrastructure/common/local";
import { routes } from "../common/Routes";

const Login = () => {
  useEffect(() => {
    let token=localStorage.getItem("token")
    let time1=localStorage.getItem("tokenTime")
    let time2=localStorage.getItem("expireTime")
      if (token !== null && time1<time2) {
        window.location.replace(routes.PAYMENTLIST )
      }

  }, [])
  return (
    <>
      <LoginContainer />
    </>
  );
};

export default Login;
