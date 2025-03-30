import React from 'react';
import { ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from '@material-tailwind/react';
export function Description({ data }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  return (
    <>
      <div className="border bg-white rounded-xl p-4 h-full">
        <Typography className=" text-gray-900 text-sm line-clamp-3">
          <span dangerouslySetInnerHTML={{ __html: data }} />
        </Typography>
        <Typography
          onClick={handleOpen}
          className="font-semibold text-sm flex items-center text-light-blue-700 hover:text-light-blue-900 cursor-pointer"
        >
          Xem thêm
          <ChevronRightIcon strokeWidth={2.5} className=" w-4 h-4" />
        </Typography>
      </div>
      <Dialog open={open} handler={handleOpen}>
        <div className="flex justify-between items-center">
          <DialogHeader>Giới thiệu</DialogHeader>
          <XMarkIcon className="h-6 w-6 mr-3 cursor-pointer" onClick={handleOpen} />
        </div>
        <DialogBody className="h-[42rem] overflow-y-scroll">
          <Typography className="font-normal text-sm">
            <span dangerouslySetInnerHTML={{ __html: data }} />
          </Typography>
        </DialogBody>
      </Dialog>
    </>
  );
}
