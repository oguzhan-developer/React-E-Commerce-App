import React, {useEffect, useState} from "react";
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
import { Divider } from "antd";
import Tab from "../../components/Detail/Tab"
import Slider from "../../components/Detail/Slider"
import Rating from "../../components/Detail/Rating"
import Favorite from "../../components/Detail/Favorite"
import SkeletonComponent from "../../components/Detail/Skeleton"
import getUID from "../../utilities/getUID";
import {useBasketItems} from "../../redux/basketSlice.jsx";

const isProductInTheBasket = async (productID, basketItems) => {
  const filteredItems =  await basketItems.filter((item) => {
    return item.id == parseInt(productID);
  });
  if (filteredItems.length > 0) return true;
  else return false;
};

function Detail() {
  const {id} = useParams();
  const dispatch = useDispatch();
  const product = useSelector(useDetailProduct);
  const loading = useSelector(useDetailIsLoading);
  const [basketLoading, setBasketLoading] = useState(true)
  const [isProductBasket, setIsProductBasket] = useState(false)
  const basketItems = useSelector(useBasketItems);
  const uid = getUID();

  useEffect(() => {
    dispatch(isFavoritedItem({uid, productId: id}));
    window.scroll(0, 0);
    dispatch(resetDetailItem());
    dispatch(getProductById(id));
  }, []);

  useEffect(()=>{
    (async () => {
      await setIsProductBasket(await isProductInTheBasket(id, basketItems))
      setBasketLoading(false)
    })()
  },[id, basketItems])

  const isProductExist = () => {
    if (!loading && product && Object.keys(product).length > 0) {
      return true;
    } else return false;
  };

  if (!loading && product && Object.keys(product).length == 0)
    return <Error404 message={"Ürün Bulunamadı."}/>;

  if (isProductExist())
    return (
        <>
          <div id={Styles.item}>
            <div id={Styles.div_image}>
              <Slider images={product.images}/>{ /*antd den aldi */}
            </div>
            <div id={Styles.div_detail}>
              <Divider plain id={Styles.product_title_divider}>
                <label id={Styles.product_title_label}>{product.title}</label>
              </Divider>
              <div id={Styles.header_div}>
                <Rating rating={product.rating}/>
                <Favorite product={product}/>
              </div>
              <label id={Styles.price_label}>TL{product.price}</label>
              {!basketLoading && <Tab isProductBasket={isProductBasket} product={product}/>}

            </div>
          </div>
        </>
    );
  else return <SkeletonComponent/>;
}

export default Detail;
