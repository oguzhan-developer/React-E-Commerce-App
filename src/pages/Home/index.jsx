import { Button } from "@mui/joy";
import React from "react";
import Card from "../../components/Card";
import Styles from "./style.module.css";
import { nextPage, useIsLastPage, useIsLoading } from "../../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";

function Home() {
  const dispatch = useDispatch();
  const isLastPage = useSelector(useIsLastPage);
  const isLoading = useSelector(useIsLoading);

  if (isLoading) return  <Loading />;
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
