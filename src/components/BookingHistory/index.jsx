import React, { useEffect, useState, useRef } from 'react';
import Filter from './Filter';
import { Card, CardBody, Typography } from '@material-tailwind/react';
import useOnFetch from '@/hooks/useOnFetch';
import { request } from '@/request';
import LoadingComponent from '../Loading/LoadingComponent';
import BookingList from '../BookingList';

const BookingHistory = () => {
  const [options, setOptions] = useState({ page: 1, items: 1 });
  const [bookings, setBookings] = useState({ pageItems: [], page: 1, numberOfPages: 1 });

  const bookingsCallBack = async ({ entity, options }) => {
    return await request.list({ entity, options });
  };

  const { result, isLoading, onFetch: fetchBookingsCallBack } = useOnFetch();

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      fetchBookingsCallBack(bookingsCallBack({ entity: 'booking', options }));
    }
  }, []);

  useEffect(() => {
    if (!result || !result.pageItems) return;

    setBookings((prev) => ({
      ...result,
      pageItems: options.page === 1 ? result.pageItems : [...prev.pageItems, ...result.pageItems], // Nối dữ liệu mới vào danh sách hiện tại
    }));
  }, [result]);

  const removeNullValues = (obj) => {
    return Object.fromEntries(
      Object.entries(obj).filter(
        ([_, value]) => value !== null && !(Array.isArray(value) && value.length === 0)
      )
    );
  };

  const handleFilterChange = (updatedFilter) => {
    const cleanedFilter = removeNullValues(updatedFilter);
    console.log(cleanedFilter);
    setOptions({ ...cleanedFilter, page: 1 });
    fetchBookingsCallBack(
      bookingsCallBack({ entity: 'booking', options: { ...cleanedFilter, page: 1 } })
    );
  };

  const handlePageChange = () => {
    setOptions((prev) => {
      const updatedOptions = { ...prev, page: prev.page + 1 };
      fetchBookingsCallBack(bookingsCallBack({ entity: 'booking', options: updatedOptions }));
      return updatedOptions;
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardBody>
          <Typography variant="h5" className="font-medium text-gray-900">
            Danh sách đặt chỗ của tôi
          </Typography>
        </CardBody>
      </Card>
      <Filter onChangeFilter={handleFilterChange} />
      {isLoading && options.page === 1 ? (
        <LoadingComponent />
      ) : (
        <BookingList data={bookings} onChangePage={handlePageChange} />
      )}
    </div>
  );
};

export default BookingHistory;
