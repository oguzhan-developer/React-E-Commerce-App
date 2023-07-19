import React from "react";
import { useSelector } from "react-redux";
import { useIsLoading, useProducts } from "../../redux/productSlice";
import Item from "./Item/Item";
import Styles from "./style.module.css";
import Loading from "../Loading";

function Card() {
  const products = useSelector(useProducts);
  const isLoading = useSelector(useIsLoading);

  if (isLoading) return <Loading />;

  return (
    <div id={Styles.Card}>
      {products.map((product, key) => {
        return <Item key={key} product={product} />;
      })}
    </div>
  );
}

export default Card;
