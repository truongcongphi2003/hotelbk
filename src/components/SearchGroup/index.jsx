import React, { useEffect, useState } from 'react';
import SearchLocation from '../SearchLocation';
import SelectDateRange from '../SelectDateRange';
import SelectPeople from '../SelectPeople';
import { Button } from '@material-tailwind/react';
import useOnFetch from '@/hooks/useOnFetch';
import { request } from '@/request';
import { erp } from '@/redux/erp/actions';
import { useDispatch } from 'react-redux';
import { differenceInDays } from 'date-fns';
import { selectSearchedItems } from '@/redux/erp/selectors';
import { useSelector } from 'react-redux';

const SearchGroup = ({ name, id, onChangeBooking }) => {
  const [location, setLocation] = useState(null);
  const [dateRange, setDateRange] = useState(new Date());
  const [peopleData, setPeopleData] = useState({
    adults: 2,
    children: 0,
    rooms: 1,
  });
  const config = {
    name,
    id,
  };

  const dispatch = useDispatch();
  const entity = 'roomtype/room';
  const { isLoading } = useSelector(selectSearchedItems);
  // const { onFetch, result, isSuccess, isLoading } = useOnFetch();

  // const asyncSearch = async (options) => {
  //   return await erp.search({ entity, options });
  // };

  const handleSearch = () => {
    const formatDate = (date) => new Date(date).toISOString().split('Z')[0];
    const options = {
      code: location?.code,
      type: location?.type,
      longitude: location?.longitude,
      latitude: location?.latitude,
      checkInDate: formatDate(dateRange.from),
      checkOutDate: formatDate(dateRange.to),
      adults: peopleData.adults,
      children: peopleData.children,
      rooms: peopleData.rooms,
    };
    dispatch(erp.search({ entity, options }));
    const nights = differenceInDays(new Date(dateRange.to), new Date(dateRange.from));
    onChangeBooking({
      checkInDate: formatDate(dateRange.from),
      checkOutDate: formatDate(dateRange.to),
      nights,
      adults: peopleData.adults,
      children: peopleData.children,
      rooms: peopleData.rooms,
    });
  };

  useEffect(() => {
    if (location?.code && location?.type && dateRange.from && dateRange.to && peopleData) {
      handleSearch();
    }
  }, [location, peopleData]);

  return (
    <div className="grid grid-cols-7 gap-3">
      <div className="col-span-2">
        <SearchLocation setLocation={setLocation} config={config} />
      </div>
      <div className="col-span-2">
        <SelectDateRange onDateChange={setDateRange} />
      </div>
      <div className="col-span-2">
        <SelectPeople peopleData={peopleData} onChange={setPeopleData} />
      </div>
      <Button loading={isLoading} onClick={handleSearch}>
        Tìm khách sạn
      </Button>
    </div>
  );
};

export default SearchGroup;
