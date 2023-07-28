import React from "react";
import Styles from "./style.module.css";
import { SHOP_NAME } from "../../App";
import { Input, SvgIcon } from "@mui/material";
import ShoppingBasketRoundedIcon from "@mui/icons-material/ShoppingBasketRounded";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/joy";
import { useSelector } from "react-redux";
import { useUser } from "../../redux/userSlice";
function Navbar() {
  const navigator = useNavigate();
  const user = useSelector(useUser);
  return (
    <div id={Styles.Navbar}>
      <h2 id={Styles.Shop_name} onClick={() => navigator("/")}>
        {SHOP_NAME}
      </h2>

      <div>
        <Input id={Styles.Input}>search for products</Input>
        {/*       <Button startIcon={<SearchOutlinedIcon className={Styles.icon}/>} />
         */}
      </div>

      <div id={Styles.Div_auth}>
        {!user && (
          <>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigator("/login")}
            >
              Login
            </Button>
            <Button variant="outlined" onClick={() => navigator("/register")}>
              Register
            </Button>
          </>
        )}

        {user && `Welcome ${user.name}`}
        <SvgIcon
          className={Styles.icon}
          component={ShoppingBasketRoundedIcon}
          color="disabled"
        />
      </div>

      {/* color =  disabled or success*/}
    </div>
  );
}

export default Navbar;
