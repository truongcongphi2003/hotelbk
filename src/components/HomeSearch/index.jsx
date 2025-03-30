import React, { useEffect, useState } from 'react';
import { Typography, Card, CardBody, Button } from '@material-tailwind/react';
import SelectPeople from '../SelectPeople';
import SelectDate from '../SelectDate';
import SelectNight from '../SelectNight';
import { addDays } from 'date-fns';
import useFormatDate from '@/hooks/useFormatDate';
import SearchLocation from '../SearchLocation';
import useOnFetch from '@/hooks/useOnFetch';
import { request } from '@/request';

export function HomeSearch() {
  const [location, setLocation] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [nights, setNights] = useState(2);
  const checkOutDate = checkInDate ? addDays(checkInDate, nights) : null;
  const [peopleData, setPeopleData] = useState({
    adults: 2,
    children: 0,
    rooms: 1,
  });

  const { onFetch, result, isSuccess, isLoading } = useOnFetch();
  const entity = 'hotel';
  const asyncSearch = async (options) => {
    return await request.search({ entity, options });
  };

  const handleSearch = () => {
    const formatDate = (date) => new Date(date).toISOString().split('Z')[0];
    const options = {
      code: location?.code,
      type: location?.type,
      checkInDate: formatDate(checkInDate),
      checkOutDate: formatDate(checkOutDate),
      longitude: location?.longitude,
      latitude: location?.latitude,
      adults: peopleData.adults,
      children: peopleData.children,
      rooms: peopleData.rooms,
    };
    console.log(options);

    const callback = asyncSearch(options);
    onFetch(callback);
  };

  return (
    <Card className="container mx-auto my-8 flex justify-center h-auto w-full lg:w-3/5 rounded-md ">
      <CardBody className="p-3">
        <div className="flex gap-4 flex-col justify-center ">
          <div>
            <Typography variant="small" color="blue-gray" className="mb-1 font-normal">
              Thành phố, địa điểm hoặc tên khách sạn:
            </Typography>
            <SearchLocation setLocation={setLocation} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="">
              <Typography variant="small" color="blue-gray" className="mb-1 font-normal">
                Nhận phòng:
              </Typography>
              <SelectDate onDateChange={setCheckInDate} />
            </div>
            <div className="">
              <Typography variant="small" color="blue-gray" className="mb-1 font-normal">
                Số đêm:
              </Typography>
              <SelectNight checkInDate={checkInDate} setNights={setNights} />
            </div>
            <div className="flex flex-col">
              <Typography variant="small" color="blue-gray" className="mb-1 font-normal">
                Trả phòng:
              </Typography>
              <Typography className="text-sm font-normal content-center h-full text-gray-800 font-semibold">
                {useFormatDate(checkOutDate)}
              </Typography>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4">
            <div className="col-span-2">
              <Typography variant="small" color="blue-gray" className="mb-1 font-normal">
                Khách:
              </Typography>
              <SelectPeople onChange={setPeopleData} />
            </div>
            <Button fullWidth color="blue" className="mt-auto" onClick={handleSearch}>
              Tìm khách sạn:
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
