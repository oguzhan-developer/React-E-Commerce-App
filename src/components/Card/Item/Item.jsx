import React from "react";
import Styles from "./style.module.css"
import { Button } from "@mui/material";
function Item({ product }) {
  return (
    <div className={Styles.item}>
      <img className={Styles.image} src={`https://picsum.photos/id/${product.id}/300/380`}/>
      <strong className={Styles.label}>{product.title}</strong>
      <label className={Styles.label}>{product.price}$</label>
      <Button className={Styles.button} variant="contained">add to basket</Button>
    </div> 
  );
}

export default Item;
