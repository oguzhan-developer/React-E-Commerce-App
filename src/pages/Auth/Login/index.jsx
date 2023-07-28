import React, { useState } from "react";
import Styles from "./style.module.css";
import InputField from "../../../Utilities/InputField";
import { Button, Card } from "@mui/joy";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../redux/userSlice";

const defaultForm = { email: "", password: "" };

function Login() {
  const dispatch = useDispatch();
  const [form, setForm] = useState(defaultForm);

  const handleBtn = () => {
    dispatch(loginUser(form));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div id={Styles.Login}>
      <Card id={Styles.Card}>
        <label>email</label>
        <InputField name="email" value={form.email} onChange={handleChange} />
        <label>password</label>
        <InputField
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <Button
          id={Styles.btn_login}
          color="success"
          disabled={false}
          onClick={handleBtn}
          size="md"
          variant="soft"
        >
          Login
        </Button>
      </Card>
    </div>
  );
}

export default Login;
