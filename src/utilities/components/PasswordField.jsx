import React from "react";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Input } from "@mui/joy";

function PasswordField({
  id,
  placeholder,
  label,
  name,
  value,
  onChange,
  required,
  setShowPassword,
  showPassword
}) {

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)};

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  return (
    <Input
      id={id}
      placeholder={placeholder}
      label={label}
      name={name}
      value={value}
      type={showPassword ? 'text' : 'password'}
      variant="soft"
      onChange={onChange}
      required={required}
      sx={{
        "--Input-radius": "0px",
        borderBottom: "2px solid",
        borderColor: "neutral.outlinedBorder",
        "&:hover": {
          borderColor: "neutral.outlinedHoverBorder",
        },
        "&::before": {
          border: "1px solid var(--Input-focusedHighlight)",
          transform: "scaleX(0)",
          left: 0,
          right: 0,
          bottom: "-2px",
          top: "unset",
          transition: "transform .15s cubic-bezier(0.1,0.9,0.2,1)",
          borderRadius: 0,
        },
        "&:focus-within::before": {
          transform: "scaleX(1)",
        },
      }}
      endDecorator={
        <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          edge="end"
        >
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
      }
    />
  );
}

export default PasswordField;
