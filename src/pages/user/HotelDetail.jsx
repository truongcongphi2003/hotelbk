import React, { useEffect, useState } from 'react';
import Gallery from '@/components/Gallery';
import { useParams } from 'react-router-dom';
import { InforHeader } from '@/components/InforCard/InforHeader';
import { HighlightFeedback } from '@/components/InforCard/HighlightFeedback';
import { AmenityMain } from '@/components/InforCard/AmenityMain';
import { Description } from '@/components/InforCard/Description';
import RoomBooking from '@/components/RoomBooking';
import { HotelAmenities } from '@/components/InforCard/HotelAmenities';
import { Address } from '@/components/InforCard/Address';
import { request } from '@/request';

import useFetch from '@/hooks/useFetch';
import useOnFetch from '@/hooks/useOnFetch';
import SearchGroup from '@/components/SearchGroup';
import { RoomSkeleton } from '@/components/RoomBooking/Skeleton';
export function HotelDetail() {
  const [bookingInfo, setBookingInfo] = useState({
    checkInDate: null,
    nights: null,
    checkOutDate: null,
    adults: null,
    children: null,
    rooms: null,
  });

  const { id } = useParams();

  const config = {
    id: id,
  };
  const { result: amenities, isLoading: amenitiesLoading } = useFetch(() =>
    request.summary({ entity: `hotel/amenities/${id}` })
  );
  const { result: detail, isLoading: detailLoading } = useFetch(() =>
    request.summary({ entity: `hotel/detail/${id}` })
  );
  const handleChangeBooking = (info) => {
    setBookingInfo(info);
  };

  const { result: hotelResult, isLoading: hotelLoading, onFetch: fetchhotelsStats } = useOnFetch();

  // useEffect(() => {
  //   fetchhotelsStats(getStatsData({ entity: 'hotel/statistic-room' }));
  // }, []);

  return (
    <div>
      <div className="sticky top-11 z-[998] bg-white shadow-md">
        <div className="container mx-auto py-3 ">
          {!detailLoading && detail && (
            <SearchGroup name={detail?.name} id={id} onChangeBooking={handleChangeBooking} />
          )}
        </div>
      </div>
      <div className="container mx-auto py-8 px-6 lg:px-2">
        <Gallery config={config} />
        <div className="mt-3 text-sm lg:shadow-lg lg:bg-white lg:rounded-xl text-black">
          {!detailLoading && (
            <div className="px-2">
              <InforHeader data={detail} isLoading={detailLoading} />
              <div className="grid gap-4 lg:grid-cols-3">
                <HighlightFeedback />
                <AmenityMain />
                <div className="lg:col-span-3">
                  <Description data={detail?.description} />
                </div>
              </div>
            </div>
          )}
          {!detailLoading ? (
            <RoomBooking hotel={detail} bookingInfo={bookingInfo} />
          ) : (
            <RoomSkeleton />
          )}

          {!amenitiesLoading && <HotelAmenities data={amenities} isLoading={amenitiesLoading} />}
          <Address />
        </div>
      </div>
    </div>
  );
}
export default HotelDetail;
