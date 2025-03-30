import React from 'react';
import { Button, Typography } from '@material-tailwind/react';
import { ChevronRightIcon, WifiIcon } from '@heroicons/react/24/outline';

export function AmenityMain(props) {
  return (
    <div className="border p-4 rounded-xl bg-white">
      <div className="flex justify-between">
        <Typography className="font-semibold text-xl text-nowrap">Tiện ích chính</Typography>
        <Typography className="font-medium flex items-center text-light-blue-700 hover:text-light-blue-900 cursor-pointer">
          Xem thêm
          <ChevronRightIcon strokeWidth={2.5} className=" w-4 h-4" />
        </Typography>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <i className="fas fa-heart" />
        <Typography className="font-medium text-sm">Lễ tân 24h</Typography>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <WifiIcon className="h-6 w-6" />
        <Typography className="font-medium text-sm">WiFi</Typography>
      </div>
    </div>
  );
}
