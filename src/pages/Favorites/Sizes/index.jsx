import { Select } from "antd";
import React from "react";
import Styles from "./style.module.css"

function Sizes() {
  return (
      <Select
      id={Styles.select}
      popupClassName={Styles.input}
      placement="topRight"
        defaultValue="M"
        style={{ width: 70 }}
        options={[
          { value: "S", label: "S" },
          { value: "M", label: "M" },
          { value: "L", label: "L" },
          { value: "XL", label: "XL" },
        ]}
      />
  );
}

export default Sizes;
