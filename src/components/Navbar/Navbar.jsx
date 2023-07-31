import React from "react";
import Styles from "./style.module.css";
import { Input, SvgIcon } from "@mui/material";
import ShoppingBasketRoundedIcon from "@mui/icons-material/ShoppingBasketRounded";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/joy";
import { useSelector } from "react-redux";
import { useUser } from "../../redux/userSlice";
import MenuComponent from "./Menu";
function Navbar() {
  const navigator = useNavigate();
  const user = useSelector(useUser);

  const basketIcon = () => {
    return (
      <SvgIcon
        className={Styles.icon}
        component={ShoppingBasketRoundedIcon}
        color="disabled"
      />
    );
  };

  return (
    <div id={Styles.navbar}>
      <h2 id={Styles.shop_name} onClick={() => navigator("/")}>
        {import.meta.env.VITE_SITE_NAME}
      </h2>

      <div>
        <Input id={Styles.input}>search for products</Input>
        {/*       <Button startIcon={<SearchOutlinedIcon className={Styles.icon}/>} />
         */}
      </div>

      <div id={Styles.div_auth}>
        {!user && (
          <>
            <Button
              variant="outlined"
              onClick={() => navigator(`${import.meta.env.VITE_PAGE_REGISTER}`)}
            >
              Register
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigator(`${import.meta.env.VITE_PAGE_LOGIN}`)}
            >
              Login
            </Button>
          </>
        )}
      </div>
      {user && (
        <div id={Styles.user_menu}>
          {basketIcon()}
          <MenuComponent userName={user.name} />
        </div>
      )}
    </div>
  );
}

export default Navbar;
