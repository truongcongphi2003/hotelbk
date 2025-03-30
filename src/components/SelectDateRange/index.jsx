import { useState, useEffect } from 'react';
import { Input, Popover, PopoverContent, PopoverHandler } from '@material-tailwind/react';
import useFormatDate from '@/hooks/useFormatDate';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { vi } from 'date-fns/locale';
import { isSunday, isBefore, startOfDay } from 'date-fns';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import { addDays, format } from 'date-fns';

const SelectDateRange = ({ onDateChange }) => {
  const today = startOfDay(new Date());

  const formDate = addDays(today, 7);
  const toDate = addDays(today, 8);
  const [range, setRange] = useState({ from: formDate, to: toDate });
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectDate = (selectedRange) => {
    if (!selectedRange || (selectedRange.from === range.from && selectedRange.to === range.to))
      return;
    setRange(selectedRange);
  };
  useEffect(() => {
    onDateChange(range);
  }, [range]);

  const formatRange = (range) => {
    if (!range.from || !range.to) return '';
    return `${useFormatDate(range.from)} - ${useFormatDate(range.to)}`;
  };

  return (
    <Popover placement="bottom-start" open={isOpen} handler={setIsOpen}>
      <PopoverHandler>
        <Input
          className="text-gray-800 font-semibold !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: 'before:content-none after:content-none',
          }}
          onChange={() => null}
          value={formatRange(range)}
        />
      </PopoverHandler>
      <PopoverContent className="z-[999]">
        <DayPicker
          mode="range"
          selected={range}
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
            today: 'rounded-md underline',
            disabled: 'text-gray-500 opacity-50 pointer-events-none cursor-none',
            //range_middle: '',
            //range_start: '',
            //range_end: ' ',
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

export default SelectDateRange;
