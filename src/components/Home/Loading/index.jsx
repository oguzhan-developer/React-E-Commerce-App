import React from "react";
import Styles from "./style.module.css";
function Loading() {
  return (
    <div id={Styles.loading}>
      {/* CircularProgress
        color="primary"
        determinate={false}
        size="lg"
        value={25}
        variant="soft"
      /> */}
    </div>
  )
}

export default Loading;
