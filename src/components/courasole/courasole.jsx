import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import Classes from '../header/header.module.css';
import { img } from './img/courasol.js';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../bootstrap.min.css';

function CarouselComponent() {
  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <Carousel
            autoPlay={true}
            infiniteLoop={true}
            showIndicators={false}
            showThumbs={false}
            className="shadow rounded"
          >
            {img.map((imgItem, index) => (
              <img key={index} src={imgItem} alt="Carousel Slide" className="img-fluid rounded" />
            ))}
          </Carousel>
        </div>
      </div>
      <div className={`${Classes.hero_img} mt-4`}></div>
    </div>
  );
}

export default CarouselComponent;
