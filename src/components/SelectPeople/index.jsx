import React, { useState, useEffect } from 'react';
import { Button, Popover, PopoverHandler, PopoverContent } from '@material-tailwind/react';
import { Input } from '@material-tailwind/react';

const SelectPeople = ({ onChange }) => {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    onChange({ adults, children, rooms });
  }, [adults, children, rooms]);

  // Cập nhật số phòng, kiểm tra điều kiện
  const handleRoomChange = (newRooms) => {
    if (newRooms > adults) {
      setError('Số phòng không thể nhiều hơn số khách người lớn');
    } else {
      setError('');
      setRooms(newRooms);
    }
  };
  const handleAdultsChange = (newAdults) => {
    if (newAdults < 1) return; // Không cho số người lớn < 1
    setAdults(newAdults);

    // Nếu số phòng lớn hơn số người lớn, tự động giảm số phòng
    if (rooms > newAdults) {
      setRooms(newAdults);
    }

    setError(''); // Xóa lỗi nếu có
  };

  return (
    <Popover
      open={isOpen}
      handler={setIsOpen}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 1, y: -25 },
      }}
      placement="bottom-end"
    >
      <PopoverHandler>
        <Input
          className="text-gray-800 font-semibold !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: 'before:content-none after:content-none',
          }}
          readOnly
          value={`${adults} người lớn, ${children} trẻ em, ${rooms} phòng`}
        />
      </PopoverHandler>
      <PopoverContent className="w-72 bg-white shadow-lg rounded-lg p-4 z-[999]">
        <div className="space-y-4 text-gray-900">
          {/* Người lớn */}
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <i className="fas fa-user"></i> Người lớn
            </span>
            <div className="flex items-center gap-2">
              <Button variant="outlined" size="sm" onClick={() => handleAdultsChange(adults - 1)}>
                -
              </Button>
              <span>{adults}</span>
              <Button variant="outlined" size="sm" onClick={() => handleAdultsChange(adults + 1)}>
                +
              </Button>
            </div>
          </div>

          {/* Trẻ em */}
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <i className="fas fa-child"></i> Trẻ em
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outlined"
                size="sm"
                onClick={() => setChildren((cur) => Math.max(0, cur - 1))}
              >
                -
              </Button>
              <span>{children}</span>
              <Button variant="outlined" size="sm" onClick={() => setChildren((cur) => cur + 1)}>
                +
              </Button>
            </div>
          </div>

          {/* Phòng */}
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <i className="fas fa-door-closed"></i> Phòng
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outlined"
                size="sm"
                onClick={() => handleRoomChange(Math.max(1, rooms - 1))}
              >
                -
              </Button>
              <span>{rooms}</span>
              <Button variant="outlined" size="sm" onClick={() => handleRoomChange(rooms + 1)}>
                +
              </Button>
            </div>
          </div>

          {/* Hiển thị thông báo lỗi nếu có */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="text-right">
            <Button variant="text" className="text-blue-500" onClick={() => setIsOpen(false)}>
              Xong
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SelectPeople;
