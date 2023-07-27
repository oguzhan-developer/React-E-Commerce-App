import React from "react";
import Styles from "./style.module.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
function Item({ product }) {
  const navigator = useNavigate();

  const navigateToDetailPage = () => {
    navigator(`/detail/${product.id}`);
  };

  return (
    <div className={Styles.item}>
      <img
        className={Styles.image}
        src={product.image}
/*         src={`https://picsum.photos/id/${product.id}/300/380`}
 */        onClick={() => navigateToDetailPage()}
      />
      <strong className={Styles.label} onClick={() => navigateToDetailPage()}>
        {product.title}
      </strong>
      <label className={Styles.label}><strong>$</strong>{product.price}</label>
      <Button className={Styles.button} variant="contained">
        add to basket
      </Button>
    </div>
  );
}

export default Item;
