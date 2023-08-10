import React from 'react'
import Styles from "./style.module.css"
import { Radio } from 'antd'
function Sizes() {
  return (
    <div id={Styles.div}>
    <Radio.Group defaultValue="M" size="large" buttonStyle="outline">
     <Radio.Button value="a">S</Radio.Button>
     <Radio.Button value="b">M</Radio.Button>
     <Radio.Button value="c">L</Radio.Button>
     <Radio.Button value="d">XL</Radio.Button>
   </Radio.Group> 
   </div>
  )
}

export default Sizes