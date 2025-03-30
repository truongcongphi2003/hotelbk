import React, { useMemo } from 'react';
import BookingItem from '../BookingItem';
import { Typography, Button, Card } from '@material-tailwind/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

const BookingList = ({ data, onChangePage }) => {
  const hasMore = data?.page < data?.numberOfPages;

  const groupedBookings = useMemo(() => {
    if (!data?.pageItems?.length) return {};

    return data.pageItems.reduce((acc, booking) => {
      const monthYear = format(new Date(booking.createdAt), 'MM yyyy', { locale: vi });

      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      acc[monthYear].push(booking);
      return acc;
    }, {});
  }, [data.pageItems]);

  return (
    <>
      {Object.keys(groupedBookings).length > 0 ? (
        <>
          <div className="flex flex-col gap-6">
            {Object.entries(groupedBookings).map(([month, bookings]) => (
              <div key={month}>
                <Typography className="text-lg font-semibold text-gray-900-700 mb-2">
                  Tháng {month}
                </Typography>
                <div className="flex flex-col gap-4">
                  {bookings.map((item) => (
                    <BookingItem key={item.id} booking={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          {hasMore && (
            <div className="w-full flex justify-center mt-4">
              <Button
                onClick={onChangePage}
                variant="text"
                className="flex items-center gap-2 normal-case text-sm"
              >
                Xem thêm
                <ChevronDownIcon className="w-5 h-5" />
              </Button>
            </div>
          )}
        </>
      ) : (
        <Typography className="text-gray-500 font-normal py-3 text-center">
          Không có dữ liệu đặt phòng.
        </Typography>
      )}
    </>
  );
};

export default BookingList;
