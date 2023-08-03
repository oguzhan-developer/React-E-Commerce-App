import React, { useState } from "react";
import Styles from "./style.module.css";
import InputField from "../../../Utilities/components/InputField";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../redux/userSlice";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import { PoweroffOutlined } from "@ant-design/icons";

const defaultForm = { email: "", password: "" };

function Login() {
  const dispatch = useDispatch();
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);

  const enterLoading = async() => {
    setLoading(true);
    await dispatch(loginUser(form));
    setLoading(false)
  };

  const handleBtn = () => {

  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div id={Styles.login}>
      <Form
        id={Styles.form}
        name="basic"
        initialValues={{}}
        autoComplete="off"
      >
        <Form.Item
          label="E-Posta"
          name="email"
          validateFirst
          rules={[
            {
              required: true,
              message: "Lütfen geçerli bir e-posta adresi giriniz.",
            },
          ]}
        >
          <Input name="email" value={form.email} onChange={handleChange} className={Styles.input} />
        </Form.Item>
        <br />
        <Form.Item
          label="Şifre"
          name="password"
          rules={[
            {
              required: true,
              message: "Lütfen şifrenizi giriniz.",
            },
          ]}
        >
          <Input.Password name="password" value={form.password} onChange={handleChange}  className={Styles.input} />
        </Form.Item>
        <Form.Item>
          <Button
          id={Styles.button}
            type="primary"
            icon={<PoweroffOutlined />}
            loading={loading}
            onClick={() => enterLoading()}
          >
            Giriş Yap
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
