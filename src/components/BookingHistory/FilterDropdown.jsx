import React, { useEffect, useState } from 'react';
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Checkbox,
  Typography,
} from '@material-tailwind/react';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

const paymentStatuses = [
  { id: 'Success', label: 'Thành công', color: 'green' },
  { id: 'Pending', label: 'Đang chờ', color: 'amber' },
  { id: 'Refunded', label: 'Đã hoàn tiền', color: 'blue' },
  { id: 'Pending-Refund', label: 'Chờ hoàn tiền', color: 'purple' },
  { id: 'NotRefunded', label: 'Không hoàn tiền', color: 'pink' },
  { id: 'Failed', label: 'Thất bại', color: 'red' },
];

export function FilterDropdown({ onChangeFilter }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  const handleStatusChange = (id) => {
    setSelectedStatuses((prev) =>
      prev.includes(id) ? prev.filter((status) => status !== id) : [...prev, id]
    );
    setOpenMenu(true);
  };
  useEffect(() => {
    onChangeFilter(selectedStatuses);
  }, [selectedStatuses]);

  return (
    <Menu open={openMenu} handler={setOpenMenu} allowHover placement="bottom-end">
      <MenuHandler>
        <Button
          variant="outlined"
          size="sm"
          className={`flex items-center h-fit gap-2 ${
            openMenu ? 'text-purple-900' : 'text-gray-800 '
          } normal-case text-xs`}
        >
          <AdjustmentsHorizontalIcon
            strokeWidth={2.5}
            className={`h-3.5 w-3.5 transition-transform ${openMenu ? 'text-purple-900' : ''}`}
          />
          Bộ lọc
        </Button>
      </MenuHandler>
      <MenuList className="w-64 p-2">
        {paymentStatuses.map(({ id, label, color }) => (
          <MenuItem key={id} className="p-0">
            <label className="flex cursor-pointer items-center gap-2 p-2 w-full">
              <Checkbox
                ripple={false}
                checked={selectedStatuses.includes(id)}
                onChange={() => handleStatusChange(id)}
                containerProps={{ className: 'p-0' }}
                className="hover:before:content-none"
                color={color}
              />
              <Typography className="font-medium text-sm" color={color}>
                {label}
              </Typography>
            </label>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
