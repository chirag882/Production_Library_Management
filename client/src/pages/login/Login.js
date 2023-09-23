import React from "react";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await axios.post("/login", values);
      if (response.data.success) {
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const onFinishFromGoogle = async (values) => {
    try {
      const response = await axios.post("/loginGoogle",values);
      if (response.data.success) {
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="authentication">
      <div className="authentication-from card p-3">
        <h1 className="card-title">Welcome Back</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>

          <Button
            className="primary-button my-2 full-width-button"
            htmlType="submit"
          >
            Login
          </Button>
          <Link to="/register" className="anchor mt-2">
            Register
          </Link>
        </Form>
        <GoogleOAuthProvider clientId="55784024139-stkb13pdu59e3lqc33128udvpfdub8u8.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              var decoded = jwt_decode(credentialResponse.credential);
              onFinishFromGoogle(decoded.email);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
}

export default Login;
