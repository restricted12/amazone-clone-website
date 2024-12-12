import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import Classes from '../header/header.module.css'
import { img } from './img/courasol.js';
import "react-responsive-carousel/lib/styles/carousel.min.css";
function CarouselComponent() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img.map((imgItem) => {
          return <img src={imgItem} alt="" />;
        })}
      </Carousel>
      <div className={ Classes.hero_img}></div>
    </div>
  );
}

export default CarouselComponent;
