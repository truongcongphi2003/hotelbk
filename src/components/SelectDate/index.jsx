import { useEffect, useState } from 'react';
import { Input, Popover, PopoverContent, PopoverHandler } from '@material-tailwind/react';
import useFormatDate from '@/hooks/useFormatDate';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { vi } from 'date-fns/locale';
import { isSunday, isBefore, startOfDay, addDays } from 'date-fns';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';

const SelectDate = ({ onDateChange }) => {
  const getStartOfDay = (date) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  };

  const [date, setDate] = useState(getStartOfDay(addDays(new Date(), 2)));

  const today = startOfDay(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectDate = (selectedDate) => {
    setIsOpen(false);

    if (!selectedDate || selectedDate.getTime() === date.getTime()) return;
    setDate(getStartOfDay(selectedDate));
  };
  useEffect(() => {
    onDateChange(date);
  }, [date]);
  return (
    <Popover placement="bottom-start" open={isOpen} handler={setIsOpen}>
      <PopoverHandler>
        <Input
          className="text-gray-800 font-semibold !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: 'before:content-none after:content-none',
          }}
          onChange={() => null}
          value={useFormatDate(date)}
        />
      </PopoverHandler>
      <PopoverContent className="z-20">
        <DayPicker
          mode="single"
          selected={date ?? new Date()}
          onSelect={handleSelectDate}
          numberOfMonths={2}
          locale={vi}
          showOutsideDays={false}
          modifiers={{
            sunday: (date) => isSunday(date),
          }}
          modifiersClassNames={{
            sunday: 'text-red-500 font-bold',
          }}
          startMonth={new Date()}
          disabled={(date) => isBefore(date, today)}
          className="border-0 "
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
            table: 'w-full border-collapse',
            head: 'flex underline text-gray-900',
            day: 'font-normal text-gray-900 text-sm hover:bg-gray-100 hover:rounded-md',
            day_button: 'w-8 h-7',
            selected:
              'rounded-md bg-blue-500 text-white hover:bg-blue-400 hover:rounded-md hover:text-white focus:bg-blue-500 focus:text-white',
            today: 'rounded-md bg-gray-200 text-gray-900',
            disabled: 'text-gray-500 opacity-50 pointer-events-none cursor-none',
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
  );
};

export default SelectDate;
