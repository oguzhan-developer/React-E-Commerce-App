import React from "react";
import Card from "../../components/Home/Card";
import Styles from "./style.module.css";
import { nextPage, useIsLastPage, useIsLoading } from "../../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Home/Loading";

function Home() {
  const dispatch = useDispatch();
  const isLastPage = useSelector(useIsLastPage);
  const isLoading = useSelector(useIsLoading);

  if (isLoading) return  <Loading />;
  return (
    <div id={Styles.home}>
      
      <Card />
      <br />
{/*       {!isLastPage && (
        <button onClick={() => dispatch(nextPage())}>Daha fazla</button>
      )} */}
      {isLastPage && <h4>Son sayfadasınız.</h4>}
    </div>
  );
}

export default Home;
