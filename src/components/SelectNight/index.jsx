import { useEffect, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import {
  Input,
  Card,
  List,
  ListItem,
  Popover,
  PopoverHandler,
  PopoverContent,
  Typography,
} from '@material-tailwind/react';
import { addDays } from 'date-fns';
import useFormatDate from '@/hooks/useFormatDate';
const SelectNight = ({ checkInDate = new Date(), setNights }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNights, setSelectedNights] = useState(2);

  const handleSelect = (nights) => {
    setIsOpen(false);
    setSelectedNights(nights);
  };
  useEffect(() => {
    setNights(selectedNights);
  }, [selectedNights]);

  return (
    <Popover placement="bottom" open={isOpen} handler={setIsOpen}>
      <PopoverHandler>
        <Input
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-gray-800 font-semibold"
          labelProps={{
            className: 'before:content-none after:content-none',
          }}
          value={`${selectedNights} đêm`}
          readOnly
        />
      </PopoverHandler>
      <PopoverContent className="p-0 z-20">
        <Card className="w-full max-h-80 overflow-x-hidden rounded-md">
          <List className="w-full p-2">
            {[...Array(30)].map((_, index) => {
              const nights = index + 1;
              const checkOutDate = addDays(checkInDate, nights);
              return (
                <div
                  key={nights}
                  onClick={() => handleSelect(nights)}
                  className={`px-3 py-2 rounded-md  ${
                    nights === selectedNights ? 'bg-blue-300 bg-opacity-75' : 'hover:bg-gray-100'
                  } `}
                >
                  <div>
                    <Typography variant="h6" color="blue-gray" className="text-sm">
                      {nights} đêm
                    </Typography>

                    <Typography variant="small" color="gray" className="text-xs font-normal">
                      {useFormatDate(checkOutDate)}
                    </Typography>
                  </div>
                </div>
              );
            })}
          </List>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default SelectNight;
