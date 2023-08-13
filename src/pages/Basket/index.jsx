import Styles from "./style.module.css"
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useBasketItems} from "../../redux/basketSlice.jsx";

function Basket() {
    const items = useSelector(useBasketItems)

    return (
        <div id={Styles.basket}>
            <div id={Styles.left}>
                <label id={Styles.title}>Sepetim ({items.length}) ürün</label>
                <div id={Styles.container_left}>
                    {
                        items.map((item, key) => {
                            return (
                                <div key={key} className={Styles.item}>
                                    <div className={Styles.img_desc_div}>
                                        <img className={Styles.item_img} src={item.images[0]} alt={item.title}/>
                                        <div className={Styles.desc_div}>
                                            <label className={Styles.item_title}>{item.title}</label>
                                            <label className={Styles.item_size}>Beden: {item.size}</label>
                                            <label
                                                className={Styles.item_ship}>{item.fastShipping ? "Hızlı kargo" : ""}</label>
                                        </div>
                                    </div>
                                    <label className={Styles.item_quantity}>{item.quantity} <span
                                        style={{fontSize: "1.2rem", fontWeight: "400"}}>adet</span></label>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div id={Styles.right}>Sepete Durumu</div>
        </div>
    )
}

export default Basket