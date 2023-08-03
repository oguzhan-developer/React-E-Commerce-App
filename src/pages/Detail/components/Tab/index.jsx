import React from "react";
import Styles from "./style.module.css";
import { Tabs } from "antd";
import {SlBasket} from "react-icons/sl"
import {CgDetailsMore} from "react-icons/cg"
import {TbTruckDelivery} from "react-icons/tb";
function Tab() {
  const onChange = (key) => {
  };
  const items = [
    {
      key: "1",
      label: (<strong id={Styles.label}><SlBasket size={"1.3rem"} /> Buy</strong>),
      children: (<>

      </>),
    },
    {
      key: "2",
      label: (<strong id={Styles.label}><CgDetailsMore size={"1.3rem"} /> Detail</strong>),
      children: `Content of Tab Pane 2`,
    },
    {
      key: "3",
      label: (<strong id={Styles.label}><TbTruckDelivery size={"1.3rem"} /> Delivery & Returns</strong>),
      children: `Content of Tab Pane 3`,
    },
  ];
  return <Tabs id={Styles.tab} defaultActiveKey="1" items={items} onChange={onChange} />;
}

export default Tab;
