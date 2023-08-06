import React from "react";
import Styles from "./style.module.css";
import { Link } from "react-router-dom";
import { Button, Dropdown, message } from "antd";
import {
  RiAccountCircleLine,
  RiLogoutBoxLine,
  RiBarChartHorizontalFill,
  RiInbox2Line
} from "react-icons/ri";

function MenuComponent({ userName }) {
  const logoutHandle = async () => {
    localStorage.removeItem("token");
    await message.success("Çıkış yaptınız.", 1);
    window.location.reload();
  };

  const items = [
    {
      key: "profile",
      label: (
        <>
          <div className={Styles.menu_div}>
            <RiBarChartHorizontalFill className={Styles.menu_icon} />
            <Link to={import.meta.env.VITE_PAGE_ACCOUNT}>Bilgilerim</Link>
          </div>
        </>
      ),
    },
    {
      key: "my orders",
      label: (
        <>
          <div className={Styles.menu_div}>
            <RiInbox2Line className={Styles.menu_icon} />
            <Link to={import.meta.env.VITE_PAGE_ORDERS}>Siparişlerim</Link>
          </div>
        </>
      ),
    },
    {
      key: "logout",
      label: (
        <div className={Styles.menu_div}>
          <RiLogoutBoxLine className={Styles.menu_icon} />
          <a onClick={logoutHandle}>Çıkış Yap</a>
        </div>
      ),
    },
  ];

  const firstLetterUpper = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  return (
    <div id={Styles.menu}>
      <Dropdown menu={{ items }} placement="bottomLeft">
        <Button
          id={Styles.button}
          type="link"
          color="black"
          style={{ width: "6rem" }}
        >
          <div id={Styles.icon_div}>
            <RiAccountCircleLine className={Styles.icon} />
          </div>
          <label id={Styles.label}>Hesabım</label>
        </Button>
      </Dropdown>
    </div>
  );
}

export default MenuComponent;
