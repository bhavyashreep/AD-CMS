import React, { useState } from "react";
import Heading from "../../../common/UI/heading/heading";
import { Checkbox, CheckboxGroup } from "../../../common/UI/checkbox/checkbox";
import { Form, Input, Button } from "antd";
import { OverviewCard, AuthWrapper } from "./Styled.js";
import { useUserStore } from "../../store";
import { useHistory } from "react-router";
import Logo from "../../../common/Assets/Images/logo.png";
import SubLogo from "../../../common/Assets/Images/sub-logo.png";
function LoginForm() {
  let history = useHistory();
  const [form] = Form.useForm();
  const [, { onSubmit }] = useUserStore();
  const [{}, { getCustomer }] = useUserStore();

  return (
    <OverviewCard>
      <img src={Logo} alt="logo" />
      <AuthWrapper>
        <div className="auth-contents">
          <Form
            name="login"
            layout="vertical"
            form={form}
            onFinish={(values) => {
              onSubmit(values, history);
              // getCustomer();
            }}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  message: "Please input your email",
                },
              ]}
            >
              <div class="form__group">
                <input
                  type="text"
                  id="username"
                  class="form__field"
                  placeholder="Username"
                  autoComplete="off"
                />
                <label for="email" class="form__label">
                  Username
                </label>
              </div>
              {/* <Input style={{ marginBottom: "24px" }} placeholder="Email" /> */}
            </Form.Item>
            <Form.Item name="password" style={{ marginBottom: "0" }}>
              <div class="form__group">
                <input
                  type="password"
                  id="password"
                  class="form__field"
                  placeholder="Password"
                  autoComplete="off"
                />
                <label for="email" class="form__label">
                  Password
                </label>
              </div>
              {/* <Input.Password
                style={{ marginBottom: "24px" }}
                placeholder="Password"
              /> */}
            </Form.Item>
            <div className="auth-form-action">
              {/* <Checkbox>Keep me logged in</Checkbox> */}
            </div>
            <Form.Item>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: "24px",
                }}
              >
                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  wrapperCol={{ offset: 8, span: 16 }}
                >
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a style={{ color: "#C81A57" }}>Forgot your password?</a>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "240px",
                  alignItems: "center",
                }}
              >
                <Button
                  // onClick={onSubmit}
                  className="btn-signin"
                  htmlType="submit"
                  type="primary"
                  size="large"
                >
                  Sign In
                </Button>
                <img style={{ width: "200px" }} src={SubLogo}></img>
              </div>
            </Form.Item>
          </Form>
        </div>
      </AuthWrapper>
    </OverviewCard>
  );
}

export default LoginForm;
