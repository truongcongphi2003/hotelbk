import React from 'react';
import { Card, Typography } from '@material-tailwind/react';
import RoomItem from './RoomItem';
const RoomTable = ({ item, hotel, bookingInfo }) => {
  return (
    <>
      <Card className="shadow-sm border h-full w-full overflow-x-scroll">
        <table className="w-full min-w-max table-auto text-left ">
          <thead>
            <tr>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography color="blue-gray" className="font-semibold leading-none">
                  Lựa chọn phòng
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography color="blue-gray" className="font-semibold leading-none text-center">
                  Khách
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography color="blue-gray" className="font-semibold leading-none text-end">
                  Giá/phòng/đêm
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"></th>
            </tr>
          </thead>
          <tbody>
            {item.rooms?.map((room, index) => {
              const isLast = index === item.rooms.length - 1;
              const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';
              return (
                <RoomItem
                  key={index}
                  roomType={item}
                  room={room}
                  hotel={hotel}
                  bookingInfo={bookingInfo}
                  classes={classes}
                />
              );
            })}
          </tbody>
        </table>
      </Card>
    </>
  );
};
export default RoomTable;
