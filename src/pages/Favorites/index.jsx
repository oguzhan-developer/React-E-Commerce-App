import React, { useEffect } from "react";
import Styles from "./style.module.css";
import { Card, Divider, List } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getFavoritesById, useFavorites } from "../../redux/favoriteSlice";
import getUID from "../../utilities/getUID";
import Rating from "../Detail/components/Rating/index"
function Favorites() {
  const dispatch = useDispatch();
  const uid = getUID();
  const favorites = useSelector(useFavorites);

  useEffect(() => {
    dispatch(getFavoritesById({ uid }));
  }, []);

  return (
    <div id={Styles.favorites}>
      {favorites.map((item) => {
        return (
          <Card style={{paddingBottom:0}} className={Styles.card}>
            <div className={Styles.div}>
            <label className={Styles.title}>{item.title}</label>
            <Divider className={Styles.divider} />
            <img className={Styles.img} src={item.images[0]} />
            </div>
          </Card>
        )
      })}
    </div>
  )
}

export default Favorites;
