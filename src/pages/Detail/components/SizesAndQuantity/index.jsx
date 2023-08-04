import React, { useState } from "react";
import Styles from "./style.module.css";
import { Button, Input, Radio } from "antd";
function SizesAndQuantity() {
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
    <div id={Styles.div}>
       <Radio.Group defaultValue="M" size="large" buttonStyle="outline">
        <Radio.Button value="a">S</Radio.Button>
        <Radio.Button value="b">M</Radio.Button>
        <Radio.Button value="c">L</Radio.Button>
        <Radio.Button value="d">XL</Radio.Button>
      </Radio.Group> 
      <label id={Styles.quantity_label}> Adet Seçimi </label>
      <span>
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
    </div>
  );
}

export default SizesAndQuantity;
