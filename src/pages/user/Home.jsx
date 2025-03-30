import React from 'react';
import DomesticHotel from '@/components/DomesticHotel';
import { HomeSearch } from '@/components/HomeSearch';
import TopBookingHotel from '@/components/TopBookingHotel/TopBookingHotel';
import { Banner } from '@/components/Banner';
export function Home() {
  return (
    <>
      <Banner />

      <HomeSearch />
      <DomesticHotel />
      <TopBookingHotel />

      {/* <div className="px-6 relative">
        <div className="absolute left-0 right-0 transform -translate-y-1/2 z-20 w-[80%] sm:w-[100%] mx-auto">
          <HomeSearch />
        </div>
        <div className="pt-20">
          <DomesticHotel />
          <TopBookingHotel />
        </div>
      </div> */}
    </>
  );
}

export default Home;
