import React from 'react';
import { HotelCard } from '../HotelCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import '../../assets/css/swiper.css';

import { Navigation } from 'swiper/modules';
const SlideHotel = ({ hotels }) => {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={2}
      breakpoints={{
        580: { slidesPerView: 2 },
        640: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      }}
      navigation={true}
      modules={[Navigation]}
      direction="horizontal"
    >
      {hotels.map((hotel) => (
        <SwiperSlide key={hotel.id}>
          <HotelCard hotel={hotel} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SlideHotel;
