import React, { useState } from "react";
import Styles from "./style.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "../../../redux/userSlice";
import MenuComponent from "./MenuComponent";
import { Badge, Button } from "antd";
import { RiHeartFill, RiShoppingBasket2Line } from "react-icons/ri";
import MenuButton from "./MenuComponent/MenuButton";
import { useBasketLength } from "../../../redux/basketSlice";

function Navbar() {
  const navigator = useNavigate();
  const user = useSelector(useUser);
  const dispatch = useDispatch();
  const basketLength = useSelector(useBasketLength);
  useState(() => {
  }, [dispatch]);

  return (
    <div id={Styles.navbar}>
      <h2 id={Styles.shop_name} onClick={() => navigator("/")}>
        {import.meta.env.VITE_SITE_NAME}
      </h2>
      {!user && (
        <div id={Styles.div_auth}>
          <Button
            id={Styles.login_btn}
            type="primary"
            onClick={() => navigator(`${import.meta.env.VITE_PAGE_REGISTER}`)}
          >
            Kayıt ol
          </Button>
          <Button
            type="primary"
            onClick={() => navigator(`${import.meta.env.VITE_PAGE_LOGIN}`)}
          >
            Giriş Yap
          </Button>
        </div>
      )}
      {user && (
        <div id={Styles.right_div}>
          <div id={Styles.user_menu}>
            <MenuButton
              danger={true}
              label={"Favorilerim"}
              icon={<RiHeartFill id={Styles.favorite_icon} />}
              onClick={() => navigator(import.meta.env.VITE_PAGE_FAVORITE)}
            />
            <MenuComponent userName={user.name} id={Styles.menu} />
          </div>
          <div id={Styles.basket_div}>
            <Link to={import.meta.env.VITE_PAGE_BASKET}>
              {basketLength && (
                <Badge size="small" color="magenta" count={parseInt(basketLength)}>
                  <RiShoppingBasket2Line id={Styles.basket_icon} size={25} />
                </Badge>
              )}
              {parseInt(basketLength) == 0 && (
                <RiShoppingBasket2Line id={Styles.basket_icon} size={25} />
              )}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
export default Navbar;
