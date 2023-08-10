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

const isProductInTheBasket = async (productID, basketItems) => {
  const filteredItems =  await basketItems.filter((item) => {
    return item.id == parseInt(productID);
  });
  if (filteredItems.length > 0) return true;
  else return false;
};

function Tab({ product }) {
  const [isProductBasket, setIsProductBasket] = useState(false)
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const uid = getUID();
  const basketItems = useSelector(useBasketItems);
  const navigator = useNavigate();

  useEffect(() => {
    (async () => {
      setIsProductBasket(await isProductInTheBasket(product.id, basketItems))
    })()
  })

  const basketHandle = async () => {
    if (!isProductBasket) {
      setLoading(true);
      await dispatch(addBasket({ uid, product }));
      setLoading(false);
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
            <Sizes />
            <ShippingSwitch />
          </div>
          <div id={Styles.quantity_and_btn_div}>
            <Quantity />
            <Button
              loading={loading}
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
  return <Tabs id={Styles.tab} defaultActiveKey="1" items={items} />;
}

export default Tab;
