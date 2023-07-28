import { Button } from "@mui/joy";
import React, { useEffect } from "react";
import Card from "../../components/Card";
import Styles from "./style.module.css";
import { nextPage, useIsLastPage } from "../../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { nanoid } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

function Home() {
  const dispatch = useDispatch();
  const isLastPage = useSelector(useIsLastPage);
  return (
    <div id={Styles.Home}>
      
      <Card />
      <br />
      {!isLastPage && (
        <Button onClick={() => dispatch(nextPage())}>Load more</Button>
      )}
      {isLastPage && <h4>you are on the last page</h4>}
    </div>
  );
}

export default Home;
