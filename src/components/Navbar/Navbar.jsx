import React from "react";
import Styles from "./style.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useUser } from "../../redux/userSlice";
import MenuComponent from "./Menu";
import { Button } from "antd";
import { HeartOutlined, StarTwoTone } from "@ant-design/icons";
function Navbar() {
  const navigator = useNavigate();
  const user = useSelector(useUser);

  const basketIcon = () => {
    return null;
    /*  <SvgIcon
        className={Styles.icon}
        component={ShoppingBasketRoundedIcon}
        color="disabled"
      /> */
  };

  return (
    <div id={Styles.navbar}>
      <h2 id={Styles.shop_name} onClick={() => navigator("/")}>
        {import.meta.env.VITE_SITE_NAME}
      </h2>

      {!user && (
        <div id={Styles.div_auth}>
          <Button
            type="primary"
            onClick={() => navigator(`${import.meta.env.VITE_PAGE_REGISTER}`)}
          >
            Register
          </Button>
          <Button
            type="primary"
            onClick={() => navigator(`${import.meta.env.VITE_PAGE_LOGIN}`)}
          >
            Login
          </Button>
        </div>
      )}
      {user && (
        <div id={Styles.user_menu}>
          {basketIcon()}
          <div style={{display:"flex"}}>
            <Button type="text" id={Styles.favorite}>
              <HeartOutlined id={Styles.heart_icon} />
              <label id={Styles.heart_label}>Favorilerim</label>
            </Button>
          </div>
          <MenuComponent userName={user.name} />
        </div>
      )}
    </div>
  );
}

export default Navbar;
