import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getProductById,
  resetDetailItem,
  useDetailError,
  useDetailIsLoading,
  useDetailProduct,
} from "../../redux/productSlice";
import Styles from "./style.module.css";
import Error404 from "../Error404";
import { isFavoritedItem } from "../../redux/favoriteSlice";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Slider from "./components/Slider";
import { Divider } from "antd";
import Tab from "./components/Tab";
import Rating from "./components/Rating";
import Favorite from "./components/Favorite";
import SkeletonComponent from "./components/Skeleton";
import getUID from "../../utilities/getUID";
function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(useDetailProduct);
  const loading = useSelector(useDetailIsLoading);
  const uid = getUID();

  useEffect(() => {
    window.scroll(0, 0);
    dispatch(resetDetailItem());
    dispatch(getProductById(id));
    dispatch(isFavoritedItem({ uid, productId: id }));
  }, []);

  const isProductExist = () => {
    if (!loading && product && Object.keys(product).length > 0) {
      return true;
    } else return false;
  };

  if (!loading && product && Object.keys(product).length == 0)
    return <Error404 message={"Ürün Bulunamadı."} />;

  if (isProductExist())
    return (
      <>
        <div id={Styles.item}>
          <div id={Styles.div_image}>
            <Slider images={product.images} />
          </div>
          <div id={Styles.div_detail}>
            <Divider plain id={Styles.product_title_divider}>
              <label id={Styles.product_title_label}>{product.title}</label>
            </Divider>
            <div id={Styles.header_div}>
              <Rating rating={product.rating} />
              <Favorite product={product} />
            </div>
            <label id={Styles.price_label}>TL{product.price}</label>
            <Tab product={product} />
          </div>
        </div>
      </>
    );
  else return <SkeletonComponent />;
}

export default Detail;
