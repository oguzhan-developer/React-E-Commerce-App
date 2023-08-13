import React from 'react'
import Styles from "./style.module.css"
import {Radio} from 'antd'

function Sizes({setSize}) {

    return (
        <div id={Styles.div}>
            <Radio.Group onChange={(e) => setSize(e.target.value)} defaultValue="M" size="large" buttonStyle="outline">
                <Radio.Button value="S">S</Radio.Button>
                <Radio.Button value="M">M</Radio.Button>
                <Radio.Button value="L">L</Radio.Button>
                <Radio.Button value="XL">XL</Radio.Button>
            </Radio.Group>
        </div>
    )
}

export default Sizes