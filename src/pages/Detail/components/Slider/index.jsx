import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Styles from "./style.module.css";
function Slider({ images, ...props }) {
  return (
    <Swiper
      {...props}
      id={Styles.slider}
      slidesPerView={1}
      color={"black"}
      spaceBetween={30}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
    >
      {images.map((image  , key) => {
        return (
          <SwiperSlide key={key}>
            <img className={Styles.image} src={image} />
          </SwiperSlide>
        )
      })}
    </Swiper>
  );
}

export default Slider;
