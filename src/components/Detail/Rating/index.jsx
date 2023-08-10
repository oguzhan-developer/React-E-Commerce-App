import { Rate } from "antd";
import React from "react";
import Styles from "./style.module.css";

function Rating({ rating }) {
  const { rate, count } = rating;

  return (
    <div id={Styles.rating}>
      <div id={Styles.left_div}>
        <label id={Styles.rate_label}>{rate}</label>
        <Rate
          style={{ fontSize: "medium" }}
          allowHalf
          disabled
          defaultValue={rate}
        />
        <label id={Styles.count_label}>
          <span>{count}</span> değerlendirme
        </label>
      </div>
    </div>
  );
}

export default Rating;
