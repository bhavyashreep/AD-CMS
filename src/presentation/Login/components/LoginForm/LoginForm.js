import React, { useState } from "react";
import Heading from "../../../common/UI/heading/heading";
import { Checkbox, CheckboxGroup } from "../../../common/UI/checkbox/checkbox";
import { Form, Input, Button } from "antd";
import { OverviewCard, AuthWrapper } from "./Styled.js";
import { useUserStore } from "../../store";
import { useHistory } from "react-router";
import Logo from "../../../common/Assets/Images/Logo.png";

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
              <Input style={{ marginBottom: "24px" }} placeholder="Email" />
            </Form.Item>
            <Form.Item name="password" style={{ marginBottom: "0" }}>
              <Input.Password
                style={{ marginBottom: "24px" }}
                placeholder="Password"
              />
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
                }}
              >
                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  wrapperCol={{ offset: 8, span: 16 }}
                >
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a>Forgot your password?</a>
              </div>
              <Button
                // onClick={onSubmit}
                className="btn-signin"
                htmlType="submit"
                type="primary"
                size="large"
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </div>
      </AuthWrapper>
    </OverviewCard>
  );
}

export default LoginForm;
