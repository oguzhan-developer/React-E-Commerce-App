import React from "react";
import Styles from "./style.module.css"
function Item({ product }) {
  return (
    <div className={Styles.item}>
      <label>{product.title}</label>
      <img src={`/src/images/${product.image}.jpg`} alt="" width={100} />
      
    </div>
  );
}

export default Item;
