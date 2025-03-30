import React from 'react';
import PolicyTimeline from './PolicyTimeLine';
import { Typography, Tooltip } from '@material-tailwind/react';
import useFormatDate from '@/hooks/useFormatDate';
import { addDays } from 'date-fns';

const PolicyDescription = ({ room, checkInDate }) => {
  const policy = room.cancellationPolicies;
  const firstPolicy = policy[0];
  const { feePercentage, minDaysBefore, cutoffTime } = firstPolicy;

  let message = '';
  let classes = '';

  if (feePercentage === 0) {
    const day = useFormatDate(addDays(checkInDate, -minDaysBefore), 'dd/MM/yyyy');
    classes = 'text-green-900';
    message = `Miễn phí hủy phòng trước ${day}`;
  } else if (feePercentage > 0 && feePercentage < 100) {
    classes = 'text-gray-700';
    message = `Phòng này có thể hoàn tiền`;
  } else {
    classes = 'text-gray-700';
    message = `Phòng này không được hoàn tiền`;
  }

  return (
    <div className={`flex items-center gap-2 ${classes}`}>
      <i className="fa-solid fa-check"></i>
      <Typography className="font-semibold text-xs">{message}</Typography>
      <Tooltip
        placement="bottom"
        content={
          <div className="w-96 py-2">
            <PolicyTimeline
              policy={room.cancellationPolicies}
              price={room.price}
              discount={room.discount}
              checkInDate={checkInDate}
            />
          </div>
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          className="-ms-1 h-4 w-4 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
          />
        </svg>
      </Tooltip>
    </div>
  );
};

export default PolicyDescription;
