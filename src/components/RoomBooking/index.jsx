import React, { useState } from 'react';
import { Typography } from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import { selectSearchedItems } from '@/redux/erp/selectors';
import { RoomSkeleton } from './Skeleton';
import Filter from './Filter';
import RoomTypeCard from './RoomTypeCard';

export default function RoomBooking({ hotel, bookingInfo }) {
  const { result, isLoading } = useSelector(selectSearchedItems);
  const [filters, setFilters] = useState({
    isCancelable: false,
    isPayAtHotel: false,
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      {!isLoading ? (
        <div className="bg-light-blue-50 bg-opacity-20 rounded-md px-2 my-3 relative">
          <Typography className="py-3" variant="h5">
            Những phòng còn trống
          </Typography>
          <Filter onFilterChange={handleFilterChange} />
          {result.map((item, index) => {
            const filteredRooms = item.rooms?.filter(
              (room) =>
                (!filters.isCancelable || room.isCancelable) &&
                (!filters.isPayAtHotel || room.isPayAtHotel)
            );

            // Nếu không có phòng nào sau khi lọc, bỏ qua hiển thị RoomTypeCard
            if (!filteredRooms || filteredRooms.length === 0) return null;

            return (
              <RoomTypeCard
                key={index}
                item={{ ...item, rooms: filteredRooms }}
                hotel={hotel}
                bookingInfo={bookingInfo}
              />
            );
          })}
        </div>
      ) : (
        <RoomSkeleton />
      )}
    </>
  );
}
