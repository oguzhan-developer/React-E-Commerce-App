import React from "react";
import { useSelector } from "react-redux";
import { useProducts } from "../../redux/productSlice";
import Item from "./Item/Item";
import Styles from "./style.module.css";

function Card() {
  const products = useSelector(useProducts);

  return (
    <div id={Styles.card}>
      {products.map((product, key) => {
        return <Item key={key} product={product} />;
      })}
    </div>
  );
}

export default Card;
