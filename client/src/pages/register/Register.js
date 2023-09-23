import React from "react";
import { Button, Form, Input } from "antd"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {

  
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const response = await axios.post("http://localhost:5000/register", values);
      if (response.data.success) {
        navigate("/login");
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  return (
    <div className="authentication">
      <div className="authentication-from card">
        <h1 className="card-title">Hey there!</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name">
            <Input placeholder="Name" />
          </Form.Item>
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
            Register
          </Button>

          <Link to="/login" className="anchor mt-2">
            Login
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Register;
