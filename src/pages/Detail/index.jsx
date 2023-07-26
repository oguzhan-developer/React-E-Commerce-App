import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getProductById,
  resetDetailItem,
  useDetailProduct,
} from "../../redux/productSlice";
import Styles from "./style.module.css";
import {
  Button,
  Rating,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useState } from "react";
function Detail() {
  const [size, setSize] = useState("S");
  const [fastShipping, setFastShipping] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(useDetailProduct);

  useEffect(() => {
    dispatch(resetDetailItem());
    dispatch(getProductById(id));
  }, []);

  if (product)
    return (
      <div className={Styles.item}>
        <div>
          <img
            className={Styles.image}
            src={`https://picsum.photos/id/${product.id}/300/380`}
          />
        </div>
        <div>
          <span id={Styles.Span_title}>
            <strong className={Styles.label}>{product.title}</strong>
            <span id={Styles.Category}>{product.category}</span>
          </span>
          <p>{product.description}</p>
          <div id={Styles.Price}>{product.price}$</div>


          <div id={Styles.Customize}>
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
          </div>


          <div id={Styles.Div_bottom}>
            <Button className={Styles.button} variant="contained">
              add to basket
            </Button>
            <span id={Styles.Rating}>
              <strong>{product.rating.rate}</strong>
              <Rating
                id={Styles.Stars}
                name="read-only"
                value={product.rating.rate}
                size="medium"
                precision={0.5}
                readOnly
              />
              <>{`${product.rating.count} people rated.`}</>
            </span>
          </div>
        </div>
      </div>
    );
}

export default Detail;
