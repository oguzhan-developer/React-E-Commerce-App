import React, { useEffect, useState } from "react";
import Styles from "./style.module.css";
import { Button, Tabs } from "antd";
import { SlBasket } from "react-icons/sl";
import { CgDetailsMore } from "react-icons/cg";
import { TbTruckDelivery } from "react-icons/tb";
import Quantity from "./Quantity";
import ShippingSwitch from "./ShippingSwitch";
import Sizes from "./Sizes";
import { useDispatch, useSelector } from "react-redux";
import { addBasket, useBasketItems } from "../../../redux/basketSlice"
import getUID from "../../../utilities/getUID";
import { useNavigate } from "react-router-dom";



function Tab({ product, isProductBasket }) {
  const [btnLoading, setBtnLoading] = useState(false);
  const [size, setSize] = useState("M")
  const [quantity, setQuantity] = useState(1);
  const [fastShipping, setFastShipping] = useState(false);
  const basketItems = useSelector(useBasketItems)
  const dispatch = useDispatch();
  const uid = getUID();
  const navigator = useNavigate();

  useEffect(() => {

  })

  const basketHandle = async () => {
    if (!isProductBasket) {
      setBtnLoading(true);
      const tempProduct = {...product, size, quantity, fastShipping}
      await dispatch(addBasket({ uid, product: tempProduct , basketItems}));
      setBtnLoading(false);
    } else navigator(import.meta.env.VITE_PAGE_BASKET);
  };

  const items = [
    {
      key: "1",
      label: (
        <strong id={Styles.label}>
          <SlBasket size={"1.3rem"} /> Satın Al
        </strong>
      ),
      children: (
        <>
          <div id={Styles.sizes_and_switch_div}>
            <Sizes setSize={setSize} />
            <ShippingSwitch fastShipping={fastShipping} setFastShipping={setFastShipping} />
          </div>
          <div id={Styles.quantity_and_btn_div}>
            <Quantity quantity={quantity} setQuantity={setQuantity} />
            <Button
              loading={btnLoading}
              onClick={basketHandle}
              id={Styles.buy_btn}
              type="primary"
              size="large"
              shape="round"
            >
              {isProductBasket && "Sepete Git"}
              {!isProductBasket && "Sepete Ekle"}
            </Button>
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: (
        <strong id={Styles.label}>
          <CgDetailsMore size={"1.3rem"} /> Detaylar
        </strong>
      ),
      children: `Content of Tab Pane 2`,
    },
    {
      key: "3",
      label: (
        <strong id={Styles.label}>
          <TbTruckDelivery size={"1.3rem"} /> Kargo & iadeler
        </strong>
      ),
      children: `Content of Tab Pane 3`,
    },
  ];
  return (
       <Tabs id={Styles.tab} defaultActiveKey="1" items={items} />
)
}

export default Tab;
