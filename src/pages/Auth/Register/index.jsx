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
import { Button } from "@mui/joy";

const defaultForm = { name: "", email: "", password: "" };
function Register() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const navigator = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBtn = () => {
    setForm(defaultForm);
    setLoading(true);
    setTimeout(()=>setLoading(false),1000)
    setTimeout(() => {
      setLoading(false);
      navigator("/");
    }, 1200);
  };

  return (
    <>
      <div id={Styles.Register}>
        <br />
        <Card id={Styles.Card} variant="outlined">
          <h4>Register and Don't miss out on discounts!</h4>

          <TextField
            id={Styles.Input_name}
            label="name"
            name="name"
            value={form.name}
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
          <br />
          <TextField
            id={Styles.Input_name}
            label="email"
            name="email"
            value={form.email}
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
          <br />
          <PasswordField
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          <br />

          <Button onClick={handleBtn} loading={loading} variant="solid">
            Register
          </Button>
          <br />
        </Card>
      </div>
    </>
  );
}

export default Register;
