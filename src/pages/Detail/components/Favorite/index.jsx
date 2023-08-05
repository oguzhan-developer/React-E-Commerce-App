import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavoriteById,
  deleteFavoriteById,
  useIsFavoritedItem,
} from "../../../../redux/favoriteSlice";
import getUID from "../../../../utilities/getUID";
import { MdFavoriteBorder } from "@react-icons/all-files/md/MdFavoriteBorder";
import { MdFavorite } from "@react-icons/all-files/md/MdFavorite";
import Styles from "./style.module.css";
import { message } from "antd";

export const succesAddFavorite = () => {
  message.success("Favorilere eklendi.", 1);
};
export const succesRemoveFavorite = () => {
  message.success("Favorilerden çıkarıldı.", 1);
};
export const notLoginFavorite = () => {
  message.info("Lütfen giriş yapın.", 1);
};

function Favorite({ product }) {
  const isFavorited = useSelector(useIsFavoritedItem);
  const dispatch = useDispatch();
  const uid = getUID();

  

  const favoriteHandle = () => {
    if (!isFavorited) dispatch(addFavoriteById({ uid, product }));
    else dispatch(deleteFavoriteById({ uid, product }));
  };
  return (
    <>
      <span onClick={favoriteHandle}>
        {isFavorited && <MdFavorite className={Styles.favorite} size={"24"} />}
        {!isFavorited && (
          <MdFavoriteBorder className={Styles.favorite} size={"24"} />
        )}
      </span>
    </>
  );
}

export default Favorite;
