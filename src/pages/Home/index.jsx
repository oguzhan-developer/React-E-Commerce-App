import { Button } from "@mui/material";
import React, { useState } from "react";
import Card from "../../components/Card";
import Styles from "./style.module.css"
import { nextPage, useIsLastPage } from "../../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
function Home() {
  const dispatch = useDispatch();
  const isLastPage = useSelector(useIsLastPage)
  return (
    <div id={Styles.Home}>
{/*       <Button variant="contained">Tikla</Button>
  
 */}      <Card/>
          {!isLastPage && <Button onClick={() => dispatch(nextPage())}>Load more</Button>}
          {isLastPage && <h4>you are on the last page</h4>}
    </div>
  );
}

export default Home;
