import React, { useEffect } from "react";
import Styles from "./style.module.css";
import StylesSizes from "./Sizes/style.module.css";
import { Button, Card, Divider, List } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteFavoriteById, getFavoritesById, useFavorites } from "../../redux/favoriteSlice";
import getUID from "../../utilities/getUID";
import Sizes from "./Sizes";
function Favorites() {
  const dispatch = useDispatch();
  const uid = getUID();
  const favorites = useSelector(useFavorites);


  const handleDelete = (product) => {
    dispatch(deleteFavoriteById({uid, product}))
  }

  useEffect(() => {
    dispatch(getFavoritesById({ uid }));
  }, []);

  return (
    <div id={Styles.favorites}>
      {favorites.map((item, key) => {
        return (
          <div key={key} className={Styles.div}>
            <div className={Styles.delete_div}>
                <Button className={Styles.delete_btn} onClick={() => handleDelete(item)} shape="circle">
                  X
                </Button>
            </div>
            <img className={Styles.img} src={item.images[0]} />
            <Divider className={Styles.divider} />
            <label className={Styles.title}>{item.title}</label>
            <div className={`${Styles.buy_div} ${StylesSizes.buy_div}`}>
              <Sizes />
              <Button>Sepete ekle</Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Favorites;
