import React from 'react';
import { Typography, Rating, Button } from '@material-tailwind/react';
import useFormatMoney from '@/hooks/useFormatMoney';
import ReactStars from 'react-rating-stars-component';

export function InforHeader({ data, isLoading }) {
  let price = data?.discount ? data?.discount : data?.price;
  return (
    <>
      {!isLoading && (
        <div className="flex flex-wrap gap-2 justify-between items-center py-6">
          <div className="flex flex-col">
            <Typography className="font-medium text-2xl">{data?.name}</Typography>
            {/* <Typography className="font-medium text-lg text-gray-600"></Typography> */}
            <ReactStars
              count={5}
              value={data?.starRating}
              size={24}
              isHalf={true}
              edit={false}
              activeColor="#ffd700"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <Typography className="font-normal text-sm text-gray-600">
                Giá/phòng/đêm từ
              </Typography>
              <Typography className="font-semibold text-2xl text-orange-800">
                {useFormatMoney(price)}
              </Typography>
            </div>

            <Button size="lg" color="orange" className="bg-orange-800">
              Chọn phòng
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
