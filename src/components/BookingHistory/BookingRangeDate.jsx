import React, { useState } from 'react';
import { Popover, PopoverHandler, PopoverContent, Typography } from '@material-tailwind/react';
import { DayPicker } from 'react-day-picker';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import useFormatDate from '@/hooks/useFormatDate';
import { isSunday, startOfDay, addDays, isBefore, isAfter } from 'date-fns';
import { vi } from 'date-fns/locale';
import { CalendarDaysIcon } from '@heroicons/react/24/solid';

export default function BookingRangeDate({ onDateChange }) {
  const today = startOfDay(new Date());
  const formDate = addDays(today, -90);
  const [startDate, setStartDate] = useState(formDate);
  const [endDate, setEndDate] = useState(today);
  const [isOpenStartDate, setIsOpenStartDate] = useState(false);
  const [isOpenEndDate, setIsOpenEndDate] = useState(false);

  const getStartOfDay = (date) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  };

  const handleSelectStartDate = (newStartDate) => {
    setIsOpenStartDate(false);

    if (!newStartDate || isAfter(newStartDate, endDate)) return;
    setStartDate(getStartOfDay(newStartDate));

    onDateChange({ startDate: getStartOfDay(newStartDate), endDate });
  };

  const handleSelectEndDate = (newEndDate) => {
    setIsOpenEndDate(false);

    if (!newEndDate || isBefore(newEndDate, startDate) || isAfter(newEndDate, today)) return;
    setEndDate(getStartOfDay(newEndDate));

    onDateChange({ startDate, endDate: getStartOfDay(newEndDate) });
  };

  return (
    <div className="flex">
      {/* Chọn ngày bắt đầu */}
      <Popover placement="bottom" open={isOpenStartDate} handler={setIsOpenStartDate}>
        <PopoverHandler>
          <div className="flex rounded-lg rounded-e-none flex-row items-center gap-3 bg-white px-3 py-2 border border-e-0 shadow-lg border-gray-500">
            <CalendarDaysIcon className="w-6 h-6 text-gray-700" />
            <div className="flex flex-col">
              <Typography className="font-normal text-gray-600 text-xs">Từ:</Typography>
              <Typography className="font-medium text-sm text-gray-900">
                {useFormatDate(startDate)}
              </Typography>
            </div>
          </div>
        </PopoverHandler>
        <PopoverContent>
          <DayPicker
            mode="single"
            selected={startDate}
            onSelect={handleSelectStartDate}
            showOutsideDays
            locale={vi}
            disabled={(date) => isAfter(date, endDate)} // Ngày bắt đầu không được lớn hơn ngày kết thúc
            modifiers={{
              sunday: (date) => isSunday(date),
            }}
            modifiersClassNames={{
              sunday: 'text-red-500 font-bold',
            }}
            className="border-0"
            classNames={{
              month_caption: 'flex justify-center py-2 mb-4 items-center',
              months: 'flex',
              month: 'flex flex-col mx-2',
              caption_label: 'text-sm font-bold text-gray-900',
              nav: 'mt-1',
              nav_button:
                'h-8 w-8 bg-gray-100 hover:bg-gray-300 p-1 transition-colors duration-300 flex items-center justify-center',
              button_previous:
                'p-1 absolute left-1.5 bg-transparent hover:bg-blue-gray-50 rounded-md transition-colors duration-300',
              button_next:
                'p-1 absolute right-1.5 bg-transparent hover:bg-blue-gray-50 rounded-md transition-colors duration-300',
              weekdays: 'border-b border-gray-400',
              weekday: 'py-1 text-xs font-normal text-gray-700',
              day: 'h-9 w-9 p-0 font-medium',
              selected:
                'rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white',
              today: 'rounded-md bg-gray-200 text-gray-900',
              outside:
                'day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10',
              disabled: 'text-gray-500 opacity-50',
              hidden: 'invisible',
            }}
            components={{
              Chevron: ({ orientation, ...props }) =>
                orientation === 'right' ? (
                  <ChevronRightIcon {...props} className="h-5 w-5 text-gray-700 stroke-2" />
                ) : orientation === 'left' ? (
                  <ChevronLeftIcon {...props} className="h-5 w-5 text-gray-700 stroke-2" />
                ) : null,
            }}
          />
        </PopoverContent>
      </Popover>

      {/* Chọn ngày kết thúc */}
      <Popover placement="bottom" open={isOpenEndDate} handler={setIsOpenEndDate}>
        <PopoverHandler>
          <div className="flex flex-row rounded-lg rounded-s-none items-center gap-3 bg-white px-3 py-2 border shadow-lg border-gray-500">
            <CalendarDaysIcon className="w-6 h-6 text-gray-700" />
            <div className="flex flex-col">
              <Typography className="font-normal text-gray-600 text-xs">Đến:</Typography>
              <Typography className="font-medium text-sm text-gray-900">
                {useFormatDate(endDate)}
              </Typography>
            </div>
          </div>
        </PopoverHandler>
        <PopoverContent>
          <DayPicker
            mode="single"
            selected={endDate}
            onSelect={handleSelectEndDate}
            showOutsideDays
            locale={vi}
            disabled={(date) => isBefore(date, startDate) || isAfter(date, today)} // Ngày kết thúc không được nhỏ hơn ngày bắt đầu hoặc lớn hơn ngày hiện tại
            modifiers={{
              sunday: (date) => isSunday(date),
            }}
            modifiersClassNames={{
              sunday: 'text-red-500 font-bold',
            }}
            className="border-0"
            classNames={{
              month_caption: 'flex justify-center py-2 mb-4 items-center',
              months: 'flex',
              month: 'flex flex-col mx-2',
              caption_label: 'text-sm font-bold text-gray-900',
              nav: 'mt-1',
              nav_button:
                'h-8 w-8 bg-gray-100 hover:bg-gray-300 p-1 transition-colors duration-300 flex items-center justify-center',
              button_previous:
                'p-1 absolute left-1.5 bg-transparent hover:bg-blue-gray-50 rounded-md transition-colors duration-300',
              button_next:
                'p-1 absolute right-1.5 bg-transparent hover:bg-blue-gray-50 rounded-md transition-colors duration-300',
              weekdays: 'border-b border-gray-400',
              weekday: 'py-1 text-xs font-normal text-gray-700',
              day: 'h-9 w-9 p-0 font-medium',
              selected:
                'rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white',
              today: 'rounded-md bg-gray-200 text-gray-900',
              outside:
                'day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10',
              disabled: 'text-gray-500 opacity-50',
              hidden: 'invisible',
            }}
            components={{
              Chevron: ({ orientation, ...props }) =>
                orientation === 'right' ? (
                  <ChevronRightIcon {...props} className="h-5 w-5 text-gray-700 stroke-2" />
                ) : orientation === 'left' ? (
                  <ChevronLeftIcon {...props} className="h-5 w-5 text-gray-700 stroke-2" />
                ) : null,
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
