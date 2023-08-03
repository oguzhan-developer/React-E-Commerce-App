import React, { useEffect } from "react";
import Styles from "./style.module.css";
import { useNavigate } from "react-router-dom";
import RatingSection from "../../../Utilities/components/RatingSection";
function Item({ product }) {
  const navigator = useNavigate();

  const navigateToDetailPage = () => {
    navigator(`${import.meta.env.VITE_PAGE_DETAIL}/${product.id}`);
  };

  return (
    <div className={Styles.item}>
      <img
        className={Styles.image}
        src={product.images[0]}
        onClick={() => navigateToDetailPage()}
      />
      <strong className={Styles.label} onClick={() => navigateToDetailPage()}>
        {product.title}
      </strong>
      <label className={Styles.label_price}>
        <strong>
          TL
          {product.price}
        </strong>
      </label>
      <RatingSection product={product} size={"small"} />
      {/* <Button className={Styles.button} variant="contained">
        add to basket
      </Button> */}
    </div>
  );
}

export default Item;
