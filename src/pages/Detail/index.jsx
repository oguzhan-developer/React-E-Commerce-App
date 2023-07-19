import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getProductById,
  resetDetailItem,
  useDetailProduct,
} from "../../redux/productSlice";
import Styles from "./style.module.css";
import { Button } from "@mui/material";
function Detail() {

  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(useDetailProduct);
  useEffect(() => {
    dispatch(resetDetailItem());
    dispatch(getProductById(id));
  }, []);

  if (product)
    return (
      <div className={Styles.item}>
        <img
          className={Styles.image}
          src={`https://picsum.photos/id/${product.id}/300/380`}
          onClick={() => navigateToDetailPage()}
        />
        <strong className={Styles.label} onClick={() => navigateToDetailPage()}>
          {product.title}
        </strong>
        <label className={Styles.label}>{product.price}$</label>
        <Button className={Styles.button} variant="contained">
          add to basket
        </Button>
      </div>
    );
}

export default Detail;
