import React from "react";
import Styles from "./style.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../redux/userSlice";
import { Button, Card, Form, Input, message } from "antd";

const defaultForm = { name: "", email: "", password: "" };

export const succesRegister = (name) => {
  message.success(`Hoşgeldin ${name}`);
};

function Register() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    await dispatch(registerUser(form));
    setForm(defaultForm);
    setLoading(false);
  };

  return (
    <>
      <div id={Styles.register}>
        <h4 className={Styles.label}>
          Register and Don't miss out on discounts!
        </h4>
        <Form
          layout="vertical"
          labelCol={4}
          wrapperCol={14}
          id={Styles.form}
          name="basic"
          initialValues={{}}
          autoComplete="off"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Ad"
            name="name"
            validateFirst
            rules={[
              {
                required: true,
                message: "Lütfen adınızı giriniz.",
              },
            ]}
          >
            <Input name="name" value={form.name} onChange={handleChange} />
          </Form.Item>
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
            <Input name="email" value={form.email} onChange={handleChange} />
          </Form.Item>
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
            <Input.Password
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Button
              id={Styles.button}
              type="primary"
              loading={loading}
              htmlType="submit"
            >
              Kayıt Ol
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default Register;
