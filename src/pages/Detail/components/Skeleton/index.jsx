import React from 'react'
import Styles from "./style.module.css";
import { Skeleton } from 'antd';
import {ImImage} from "@react-icons/all-files/im/ImImage"
function SkeletonComponent() {
  return (
    <div id={Styles.div_skeleton}>
          <Skeleton.Node active block className={Styles.image_skeleton}>
            <ImImage id={Styles.image_skeleton_icon} />
          </Skeleton.Node>
          <div style={{width:"90%",marginRight:"1.5rem"}}>
          <Skeleton className={Styles.top}/>
          <Skeleton.Button className={Styles.p} active block/>
          <Skeleton.Button className={Styles.p} active block/>
          <Skeleton.Button className={Styles.p} active block/>
          <Skeleton.Button className={Styles.p} active block/>
          </div>
        </div>
  )
}

export default SkeletonComponent