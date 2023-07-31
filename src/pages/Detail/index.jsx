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
import {
  Button,
  Rating,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useState } from "react";
import { Alert, IconButton, LinearProgress } from "@mui/joy";
import { FavoriteBorder, FavoriteSharp } from "@mui/icons-material";
import RatingSection from "../../Utilities/RatingSection";
import Error404 from "../Error404";
import Loading from "../../components/Loading";
import { addFavorite } from "../../redux/favoriteSlice";
import { useUser } from "../../redux/userSlice";

function Detail() {
  const [size, setSize] = useState("S");
  const [fastShipping, setFastShipping] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [alert, setAlert] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(useDetailProduct);
  const loading = useSelector(useDetailIsLoading);
  const user = useSelector(useUser)

  useEffect(() => {
    window.scroll(0,0)
    dispatch(resetDetailItem());
    dispatch(getProductById(id));
  }, []);

  const handleBasket = () => {
    dispatch(addFavorite({userId: user.id, product}))
  }

  const sizeSection = () => {
    return (
      <ToggleButtonGroup
        id={Styles.Size_area}
        color="primary"
        value={size}
        exclusive
        onChange={(e) => {
          setSize(e.target.innerText);
        }}
        aria-label="Sizes"
      >
        <ToggleButton className={Styles.togglebtn} value="S">
          S
        </ToggleButton>
        <ToggleButton className={Styles.togglebtn} value="M">
          M
        </ToggleButton>
        <ToggleButton className={Styles.togglebtn} value="L">
          L
        </ToggleButton>
        <ToggleButton className={Styles.togglebtn} value="XL">
          XL
        </ToggleButton>
      </ToggleButtonGroup>
    );
  };

  const shippingSection = () => {
    return (
      <span id={Styles.ShippingTypes}>
        <strong>
          {fastShipping && "Fast Shipping"}
          {!fastShipping && "Standart Shipping"}
        </strong>
        <Switch
          checked={fastShipping}
          onClick={() => setFastShipping(!fastShipping)}
        />
      </span>
    );
  };

  const addToBasketBtn = () => {
    return (
      <Button className={Styles.button} onClick={handleBasket} variant="contained">
        add to basket
      </Button>
    );
  };

  const favoriteBtn = () => {
    return (
      <IconButton
        onClick={() => {
          setFavorite(!favorite);
          setAlert(true);
        }}
      >
        {favorite && <FavoriteSharp />}
        {!favorite && <FavoriteBorder />}
      </IconButton>
    );
  };

  const favoriteAlert = () => {
    if (alert) {
      setTimeout(() => setAlert(false), 1000);
      return (
        <Alert
          sx={{ alignItems: "flex-start" }}
          startDecorator={React.cloneElement(<CheckCircleIcon />, {
            sx: { mt: "2px", mx: "4px" },
            fontSize: "xl2",
          })}
          variant="soft"
          color="success"
          endDecorator={
            <IconButton variant="soft" size="sm" color="success">
              <CloseRoundedIcon onClick={() => setAlert(false)} />
            </IconButton>
          }
        >
          <div>
            <Typography fontWeight="lg" mt={0.25}>
              {"Favorited."}
            </Typography>
          </div>
        </Alert>
      );
    }
  };

  if(loading) return <Loading />
  else{
    if (product && Object.keys(product).length > 0)
    return (
      <>
        <div className={Styles.item}>
          <div>
            <img className={Styles.image} src={product.image} />
          </div>
          <div>
            <span id={Styles.Span_title}>
              <strong name="title" className={Styles.label}>
                {product.title}
              </strong>
              <span name="category" id={Styles.Category}>
                {product.category}
              </span>
            </span>
            <p>{product.description}</p>
            <div name="price" id={Styles.Price}>
              {product.price}$
            </div>

            <div id={Styles.Customize}>
              {sizeSection()}
              {shippingSection()}
            </div>

            <div id={Styles.Div_bottom}>
              <div id={Styles.div_btn_favorite}>
                {addToBasketBtn()}
                {favoriteBtn()}
              </div>
              <RatingSection product={product} size="medium" />
            </div>
          </div>
        </div>
        {favoriteAlert()}
      </>
    );
  else if (!product || Object.keys(product).length == 0)
    return <Error404 message={"Ürün Bulunamadı."} />;
  }
    
  
}

export default Detail;
