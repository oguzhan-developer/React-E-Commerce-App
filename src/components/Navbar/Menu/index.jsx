import React, { useEffect } from "react";
import Styles from "./style.module.css";
import Favorites from "../../../pages/Favorites";
import { Link } from "react-router-dom";
import { Button, Dropdown } from "antd";
function MenuComponent({ userName }) {
  const items = [
    {
      key: "profile",
      label: <Link to={import.meta.env.VITE_PAGE_ACCOUNT}>Hesabım</Link>,
    },
    {
      key: "favorite",
      label: <Link to={import.meta.env.VITE_PAGE_FAVORITE}>Favoriler</Link>,
    },
    {
      key: "logout",
      label: <a>Çıkış Yap</a>,
    },
  ];

  const firstLetterUpper = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  return (
    <div id={Styles.menu}>
      <Dropdown menu={{ items }} placement="bottomLeft">
        <Button id={Styles.button} type="link" color="black" style={{ width: "6rem" }}>
          <strong id={Styles.label}>{firstLetterUpper(userName)}</strong>
        </Button>
      </Dropdown>
    </div>
  );
}

export default MenuComponent;