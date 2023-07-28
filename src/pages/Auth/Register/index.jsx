import React from "react";
import Styles from "./style.module.css";
import { useState } from "react";
import PasswordField from "../../../Utilities/PasswordField";
import {
  Alert,
  Box,
  Card,
  Collapse,
  IconButton,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, useRegisterIsLoading } from "../../../redux/userSlice";
import InputField from "../../../Utilities/InputField";

const defaultForm = { name: "", email: "", password: "" };
function Register() {
  const isLoading = useSelector(useRegisterIsLoading)
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const dispatch = useDispatch()
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBtn = (e) => {
    e.preventDefault()
    dispatch(registerUser(form))
    setForm(defaultForm);
  };

  return (
    <>
      <div id={Styles.Register}>
        <br />
        <Card id={Styles.Card} variant="outlined">
          <h4>Register and Don't miss out on discounts!</h4>
          <form onSubmit={handleBtn}>
            <label>name</label>
          <InputField 
            name="name"
            value={form.name}
            onChange={handleChange}
            required = {true} />
          <br />

          <label>email</label>
          <InputField
            name="email"
            value={form.email}
            onChange={handleChange}
            required = {true}
          />
          <br />
          <label>password</label>

          <PasswordField
            name="password"
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            value={form.password}
            onChange={handleChange}
            required = {true}
          />
          <br />

          <Button loading={isLoading} variant="solid" type="submit">
            Register
          </Button>
          </form>
          <br />
        </Card>
      </div>
    </>
  );
}

export default Register;
