import { Button } from "@mui/joy";
import React from "react";
import Card from "../../components/Card";
import Styles from "./style.module.css"
import { nextPage, useIsLastPage } from "../../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { nanoid } from "@reduxjs/toolkit";
function Home() {
  const dispatch = useDispatch();
  const isLastPage = useSelector(useIsLastPage)

  const handleBtn = async() => {
    const response = await axios.post("http://localhost:3004/users/",{id:nanoid(),username:"Oğuzhan YALÇIN",email:"als24i@gmail.com",password:"aliucak12"})
    console.log(response);
  }

  return (
    <div id={Styles.Home}>
{       <Button variant="solid" onClick={()=>handleBtn()}>Kullanıcı ekle</Button>
  
 }      <Card/>
          {!isLastPage && <Button onClick={() => dispatch(nextPage())}>Load more</Button>}
          {isLastPage && <h4>you are on the last page</h4>}
    </div>
  );
}

export default Home;
