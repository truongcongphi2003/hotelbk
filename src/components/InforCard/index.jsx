import React from 'react';

import InforHeader from './InforHeader';
import HighlightFeedback from './HighlightFeedback';
import AmenityMain from './AmenityMain';
import Description from './Description';
import RoomItem from '../RoomBooking';
import Address from './Address';
import { HotelAmenities } from './HotelAmenities';

function InforCard({ config }) {
  return (
    <div className="mt-3 text-sm lg:px-6 lg:shadow-lg lg:bg-white lg:rounded-xl text-black">
      <InforHeader />
      <div className="grid gap-4 lg:grid-cols-3">
        <HighlightFeedback />
        <AmenityMain />
        <div className="lg:col-span-3">
          <Description />
        </div>
      </div>
      <RoomItem />
      <HotelAmenities />
      <Address />
    </div>
  );
}

export default InforCard;
