import React from 'react'
import Styles from "./style.module.css"
import { Rating } from '@mui/material';
function RatingSection({product, size}) {
    return (
        <span id={Styles.Rating}>
          <strong>{product.rating.rate}</strong>
          <Rating
            id={Styles.Stars}
            name="read-only"
            value={product.rating.rate}
            size={size}
            precision={0.5}
            readOnly
          />
          <>{`${product.rating.count} reviews.`}</>
        </span>
      );
}

export default RatingSection