import React, { useEffect } from "react";
import Styles from "./style.module.css";
import { Button, Menu, MenuItem } from "@mui/joy";
import Favorites from "../../../pages/Favorites";
import { useNavigate } from "react-router-dom";

function MenuComponent({ userName }) {
  const buttonRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const navigator = useNavigate();
  const firstLetterUpper = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  const handleClose = (e) => {
    setOpen(false);
    switch (e.target.id) {
      case "profile":
        return null;
      case "favorite":
        return navigator(import.meta.env.VITE_PAGE_FAVORITE);
      case "logout":
        return null;
    }
  };

  return (
    <div id={Styles.Menu}>
      <Button
        ref={buttonRef}
        id="basic-demo-button"
        aria-controls={"basic-menu"}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="outlined"
        color="neutral"
        onClick={() => {
          setOpen(!open);
        }}
      >
        {firstLetterUpper(userName)}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={buttonRef.current}
        open={open}
        aria-labelledby="basic-demo-button"
      >
        <MenuItem id="profile" onClick={handleClose}>
          Hesabım
        </MenuItem>
        <MenuItem id="favorite" onClick={handleClose}>
          Favorilerim
        </MenuItem>
        <MenuItem id="logout" onClick={handleClose}>
          Çıkış Yap
        </MenuItem>
      </Menu>
    </div>
  );
}

export default MenuComponent;
