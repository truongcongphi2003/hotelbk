import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../../assets/css/swiper.css';
import { Pagination, Navigation } from 'swiper/modules';

export function Banner() {
  return (
    <div className="py-16 bg-blue-300  relative flex gap-8">
      <div className="absolute h-36 w-60 bg-red-500 mx-auto">Slide 1</div>

      <Swiper
        slidesPerView={'auto'}
        centeredSlides={true}
        spaceBetween={30}
        navigation={true}
        grabCursor={true}
        modules={[Pagination, Navigation]}
        className=" h-36 mx-auto z-10"
      >
        <SwiperSlide className="h-36 w-60 bg-blue-700">Slide 2</SwiperSlide>
        <SwiperSlide className="h-36 w-60 bg-blue-700">Slide 3</SwiperSlide>
        <SwiperSlide className="h-36 w-60 bg-blue-700">Slide 4</SwiperSlide>
        <SwiperSlide className="h-36 w-60 bg-blue-700">Slide 5</SwiperSlide>
        <SwiperSlide className="h-36 w-60 bg-blue-700">Slide 6</SwiperSlide>
        <SwiperSlide className="h-36 w-60 bg-blue-700">Slide 7</SwiperSlide>
      </Swiper>
    </div>
  );
}
