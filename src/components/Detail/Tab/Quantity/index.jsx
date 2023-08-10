import React, { useState } from "react";
import Styles from "./style.module.css";
import { Button, Input, Radio } from "antd";
function Quantity() {
  const [quantity, setQuantity] = useState(1);
  const minValue = 1;
  const maxValue = 99;
  const increaseQuantity = () => {
    if (quantity > maxValue) setQuantity(maxValue);
    if (quantity < maxValue) setQuantity((prev) => prev + 1);
  };
  const decreaseQuantity = () => {
    if (quantity < minValue) setQuantity(minValue);
    if (quantity > minValue) setQuantity((prev) => prev - 1);
  };

  const handleInput = (e) => {
    let value = parseInt(e.target.value);
    if (value > 99) value = 99;
    if (value < 0) value = 0;
    setQuantity(value);
  };

  return (
    <span>
      <span id={Styles.quantity_label}> Adet Seçimi </span>
      <Button
        onClick={decreaseQuantity}
        shape="circle"
        className={Styles.control_btn}
      >
        -
      </Button>
      <Input
        pattern="[0-9]*"
        value={quantity}
        max={99}
        onChange={handleInput}
        minLength={1}
        maxLength={99}
        id={Styles.quantity_input}
        defaultValue={1}
        type="number"
      />
      <Button
        onClick={increaseQuantity}
        shape="circle"
        className={Styles.control_btn}
      >
        +
      </Button>
    </span>
  );
}

export default Quantity;
