import { Checkbox, Typography } from '@material-tailwind/react';
import React, { useState } from 'react';

const Filter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    isCancelable: false,
    isPayAtHotel: false,
  });
  const handleCheckboxChange = (name) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [name]: !prev[name] };
      onFilterChange(newFilters);
      return newFilters;
    });
  };
  return (
    <div className="border shadow-sm rounded-lg bg-white py-4 px-4">
      <Typography className="font-medium">
        Tìm kiếm nhanh hơn bằng cách chọn những tiện nghi bạn cần
      </Typography>
      <div className="grid grid-cols-3 ">
        <Checkbox
          checked={filters.isCancelable}
          onChange={() => handleCheckboxChange('isCancelable')}
          label={
            <Typography color="blue-gray" className="flex font-medium text-xs">
              Miễn phí hủy phòng
            </Typography>
          }
        />
        <Checkbox
          checked={filters.isPayAtHotel}
          onChange={() => handleCheckboxChange('isPayAtHotel')}
          label={
            <Typography color="blue-gray" className="flex font-medium text-xs">
              Thanh toán tại khách sạn
            </Typography>
          }
        />
      </div>
    </div>
  );
};

export default Filter;
