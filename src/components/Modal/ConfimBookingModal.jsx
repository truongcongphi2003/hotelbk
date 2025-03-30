import React from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';

export function ConfirmBookingModal({ open, onClose, onConfirm, loading }) {
  return (
    <Dialog open={open} handler={onClose}>
      <DialogHeader>Xác nhận đặt phòng</DialogHeader>
      <DialogBody>Bạn có chắc chắn muốn thực hiện đặt phòng không?</DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={onClose} className="mr-1">
          <span>Hủy</span>
        </Button>
        <Button loading={loading} variant="gradient" color="green" onClick={onConfirm}>
          <span>Xác nhận</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
