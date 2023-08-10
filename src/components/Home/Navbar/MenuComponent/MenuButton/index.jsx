import React from "react";
import Styles from "./style.module.css";
import { Button } from "antd";
function MenuButton({ label , danger, onClick, icon}) {
  return (
    <div className={Styles.div}>
      <Button type="link" danger={danger} onClick={onClick} className={Styles.button}>
        <div className={Styles.icon_div}>
        {icon}
        </div>
        <label className={Styles.label}>{label}</label>
      </Button>
    </div>
  );
}

export default MenuButton;
