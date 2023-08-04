import React from "react";
import Styles from "./style.module.css";
import { Tabs } from "antd";
import { SlBasket } from "react-icons/sl";
import { CgDetailsMore } from "react-icons/cg";
import { TbTruckDelivery } from "react-icons/tb";
import SizesAndQuantity from "../SizesAndQuantity";
function Tab() {
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
          <div id={Styles.div_sizes}>
            <SizesAndQuantity />
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
