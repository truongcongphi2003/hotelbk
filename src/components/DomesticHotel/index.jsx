import React, { useEffect, useState } from 'react';

import { Typography } from '@material-tailwind/react';
import SlideHotel from './SlideHotel';
import { LocationTag } from '../LocationTag';
import { erp } from '@/redux/erp/actions';
import { selectListItems } from '@/redux/erp/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { CardPlacehoderSkeleton } from '../CardPlacehoderSketeton';

const locations = [
  {
    code: '01',
    name: 'Hà Nội',
    type: 'province',
  },
  {
    code: 37,
    name: 'Nghệ An',
    type: 'province',
  },
  {
    code: 34,
    name: 'Hải Dương',
    type: 'province',
  },
];

function DomesticHotel() {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const { result, isLoading, isSuccess } = useSelector(selectListItems);
  const options = {
    code: selectedLocation.code,
    type: selectedLocation.type,
    page: 1,
    items: 10,
  };
  const entity = 'hotel/location';
  const dispatch = useDispatch();
  const dispatcher = () => {
    dispatch(erp.list({ entity, options }));
  };
  useEffect(() => {
    dispatcher();
    console.log(selectedLocation);
  }, [selectedLocation]);
  return (
    <div className="container mx-auto my-8 ">
      <Typography className="font-medium text-2xl mb-3">🏝️Chơi Lễ trong nước</Typography>
      <LocationTag
        locations={locations}
        setSelectedLocation={setSelectedLocation}
        selectedLocation={selectedLocation}
      />
      {isLoading ? (
        <CardPlacehoderSkeleton />
      ) : result.items.length > 0 ? (
        <SlideHotel hotels={result.items} />
      ) : (
        'Không có khách sạn nào'
      )}
    </div>
  );
}

export default DomesticHotel;
