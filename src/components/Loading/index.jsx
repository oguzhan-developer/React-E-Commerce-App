import React from "react";
import Styles from "./style.module.css";
import { LinearProgress } from "@mui/joy";
function Loading() {
  return (
    <>
      <LinearProgress thickness={1} />
      <div>
        <label id={Styles.Loading}>Loading</label>
      </div>
    </>
  );
}

export default Loading;
