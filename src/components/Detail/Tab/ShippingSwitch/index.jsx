import React, { useState } from "react";
import Styles from "./style.module.css";
import { Checkbox, Switch } from "antd";
import { LiaShippingFastSolid } from "react-icons/lia";

function ShippingSwitch() {
  const [fastShipping, setFastShipping] = useState(false);
  return (
    <div id={Styles.div}>
      <Switch onChange={(e) => setFastShipping(e)} />
      <span
        id={Styles.label}
        className={fastShipping ? Styles.checked_label : ""}
      >
        Hızlı Kargo{" "}
      <span>{fastShipping && <LiaShippingFastSolid size={"1.2rem"} />}</span>
      </span>
    </div>
  );
}

export default ShippingSwitch;
