import React from 'react';
import { Card, Typography } from '@material-tailwind/react';
import Header from './Header';
import RoomTable from './RoomTable';
const RoomTypeCard = ({ item, hotel, bookingInfo }) => {
  return (
    <Card className="border p-4  mt-2">
      <Typography className="font-medium text-xl text-gray-900 mb-3">{item.name}</Typography>
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4">
        <div className="flex flex-col col-span-1">
          <Header item={item} />
        </div>
        <div className="col-span-2">
          <RoomTable hotel={hotel} bookingInfo={bookingInfo} item={item} />
        </div>
      </div>
    </Card>
  );
};

export default RoomTypeCard;
