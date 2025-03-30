import React from 'react';
import { HotelCard } from '../HotelCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import '../../assets/css/swiper.css';

import { Navigation } from 'swiper/modules';
import { Typography } from '@material-tailwind/react';

const hotelData = [
  {
    id: 1,
    name: 'Khách sạn Balenciaga',
    location: 'Hà Nội',
    imageUrl:
      'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    rating: 5.0,
    reviews: 634,
    originalPrice: 234000,
    discountedPrice: 122000,
  },
  {
    id: 2,
    name: 'Khách sạn Intercontinental',
    location: 'TP. Hồ Chí Minh',
    imageUrl:
      'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    rating: 4.8,
    reviews: 512,
    originalPrice: 450000,
    discountedPrice: 350000,
  },
  {
    id: 3,
    name: 'Khách sạn Vinpearl',
    location: 'Đà Nẵng',
    imageUrl:
      'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    rating: 4.9,
    reviews: 720,
    originalPrice: 300000,
    discountedPrice: 250000,
  },
  {
    id: 4,
    name: 'Khách sạn Hilton',
    location: 'Hội An',
    imageUrl:
      'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    rating: 4.7,
    reviews: 450,
    originalPrice: 500000,
    discountedPrice: 400000,
  },
  {
    id: 5,
    name: 'Khách sạn Pullman',
    location: 'Nha Trang',
    imageUrl:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    rating: 4.6,
    reviews: 378,
    originalPrice: 550000,
    discountedPrice: 480000,
  },
  {
    id: 6,
    name: 'Khách sạn Mường Thanh',
    location: 'Sapa',
    imageUrl:
      'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    rating: 4.8,
    reviews: 540,
    originalPrice: 650000,
    discountedPrice: 500000,
  },
];

function TopBookingHotel() {
  return (
    <div className="container mx-auto py-6">
      <Typography className="font-medium text-2xl mb-3">Đặt nhiều nhất</Typography>
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
        {hotelData.map((hotel) => (
          <SwiperSlide key={hotel.id}>
            <HotelCard data={hotel} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default TopBookingHotel;
