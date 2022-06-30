import React from "react";
import Bg from "../../../common/Assets/Images/Bg.png";
import Container from "./styled"
import LoginForm from "../LoginForm/LoginForm";

function LoginContainer() {
  return (
    <>
      <Container>
        <div style={{width:"55%"}} className="ImageContainer">
          {/* <h1>Admin Panel</h1>
          <div>
          </div> */}
            <img src={Bg} alt="" />

        </div>
        <div className="FormContainer">
            <LoginForm />
        </div>
      </Container>
    </>
  );
}

export default LoginContainer;
