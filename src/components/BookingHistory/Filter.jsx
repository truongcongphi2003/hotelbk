import { Button, Menu, MenuHandler, MenuList } from '@material-tailwind/react';
import React, { useEffect, useState, useRef } from 'react';
import { FilterDropdown } from './FilterDropdown';
import BookingRangeDate from './BookingRangeDate';

const Filter = ({ onChangeFilter }) => {
  const [selectedFilter, setSelectedFilter] = useState('past90days');
  const [filterOptions, setFilterOptions] = useState({
    startDate: null,
    endDate: null,
    pastDays: 90,
    month: null,
    year: null,
    paymentStatus: [],
    items: 1,
    page: 1,
  });
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  // Xác định hai tháng trước
  const prevMonth1 = currentMonth === 1 ? 12 : currentMonth - 1;
  const prevYear1 = currentMonth === 1 ? currentYear - 1 : currentYear;

  const prevMonth2 = currentMonth <= 2 ? 12 - (2 - currentMonth) : currentMonth - 2;
  const prevYear2 = currentMonth <= 2 ? currentYear - 1 : currentYear;

  const predefinedFilters = [
    { id: 'past90days', label: '90 ngày qua', pastDays: 90 },
    {
      id: 'prevMonth1',
      label: `Tháng ${prevMonth1} / ${prevYear1}`,
      month: prevMonth1,
      year: prevYear1,
    },
    {
      id: 'prevMonth2',
      label: `Tháng ${prevMonth2} / ${prevYear2}`,
      month: prevMonth2,
      year: prevYear2,
    },
  ];
  useEffect(() => {
    onChangeFilter(filterOptions);
  }, [filterOptions]);

  const handleFilterClick = (option) => {
    setSelectedFilter(option.id);

    setFilterOptions((prev) => ({
      ...prev,
      startDate: null,
      endDate: null,
      pastDays: option.pastDays || null,
      month: option.month || null,
      year: option.year || null,
    }));
  };
  const formatDate = (date) => new Date(date).toISOString().split('Z')[0];

  const handleDateChange = ({ startDate, endDate }) => {
    setSelectedFilter('customDate');

    setFilterOptions((prev) => ({
      ...prev,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      pastDays: null,
      month: null,
      year: null,
    }));
  };

  const handlePaymentStatusChange = (statuses) => {
    setFilterOptions((prev) => ({
      ...prev,
      paymentStatus: statuses,
    }));
  };

  return (
    <div className="flex flex-col gap-2 items-end">
      <div className="flex gap-6">
        {predefinedFilters.map((option) => (
          <Button
            key={option.id}
            variant={selectedFilter === option.id ? 'filled' : 'outlined'}
            color="blue"
            size="sm"
            className={`h-fit normal-case text-xs border-gray-900 ${
              selectedFilter === option.id ? '' : 'text-gray-900'
            }`}
            onClick={() => handleFilterClick(option)}
          >
            {option.label}
          </Button>
        ))}

        <div>
          <Button
            variant={selectedFilter === 'customDate' ? 'filled' : 'outlined'}
            color="blue"
            size="sm"
            className={`h-fit normal-case text-xs border-gray-900 ${
              selectedFilter === 'customDate' ? '' : 'text-gray-900'
            }`}
            onClick={() => setSelectedFilter('customDate')}
          >
            Ngày tùy chọn
          </Button>
        </div>

        <FilterDropdown onChangeFilter={handlePaymentStatusChange} />
      </div>
      {selectedFilter === 'customDate' && (
        <div className="w-fit">
          <BookingRangeDate onDateChange={handleDateChange} />
        </div>
      )}
    </div>
  );
};

export default Filter;
