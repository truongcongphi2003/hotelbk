import { useState, useEffect, useMemo } from 'react';
import moment from 'moment';
import { BuildingOffice2Icon } from '@heroicons/react/24/solid';
import { Badge, Button, Chip, Typography } from '@material-tailwind/react';
import useFormatMoney from '@/hooks/useFormatMoney';
import useFormatDate from '@/hooks/useFormatDate';
import { Link } from 'react-router-dom';

const ChipStatus = ({ status }) => {
  const bookingStatus = [
    { id: 'Success', label: 'Thành công', color: 'green' },
    { id: 'Pending', label: 'Đang chờ', color: 'amber' },
    { id: 'Refunded', label: 'Đã hoàn tiền', color: 'blue' },
    { id: 'Pending-Refund', label: 'Chờ hoàn tiền', color: 'purple' },
    { id: 'NotRefunded', label: 'Không hoàn tiền', color: 'pink' },
    { id: 'Failed', label: 'Thất bại', color: 'red' },
  ];

  // Tìm kiếm trạng thái phù hợp
  const foundStatus = bookingStatus.find((item) => item.id === status);

  return (
    <Chip
      variant="ghost"
      value={foundStatus ? foundStatus.label : 'Không xác định'}
      className="rounded-full normal-case py-1 px-3"
      color={foundStatus ? foundStatus.color : 'gray'}
    />
  );
};

const CountdownTimer = ({ createdAt }) => {
  const expireTime = useMemo(() => moment(createdAt).add(1, 'hour'), [createdAt]);
  const [timeLeft, setTimeLeft] = useState(expireTime.diff(moment(), 'seconds'));

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const remaining = expireTime.diff(moment(), 'seconds');
        if (remaining <= 0) {
          clearInterval(timer);
          return 0;
        }
        return remaining;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, expireTime]);

  return (
    <Typography className="text-sm font-medium text-red-600">
      {timeLeft > 0
        ? `Thời gian còn lại: ${moment.utc(timeLeft * 1000).format('mm:ss')}`
        : 'Quá thời hạn thanh toán'}
    </Typography>
  );
};

const BookingItem = ({ booking }) => {
  const createdAt = moment(booking.createdAt);
  const now = moment();
  const isExpired = useMemo(
    () => !booking.paymentStatus && now.diff(createdAt, 'hours') >= 1,
    [booking.paymentStatus, createdAt, now]
  );

  return (
    <div className="border rounded-lg bg-white shadow-md p-4 flex gap-4">
      <div className="flex flex-col w-full gap-2">
        <div className="w-full flex justify-between">
          <div className="flex items-center gap-2">
            <BuildingOffice2Icon className="w-6 h-6 text-blue-700" />
            <Typography className="font-medium text-lg">{booking.hotelName}</Typography>
          </div>
          <Typography className="text-xs font-normal">
            {useFormatDate(booking.createdAt, 'dd/MM/yyyy  HH:mm')}
          </Typography>
        </div>
        <div className="flex gap-2 items-center">
          <Typography className="font-normal text-sm text-gray-700">Mã đặt chỗ:</Typography>
          <Typography className="font-medium text-sm">#{booking.bookingReference}</Typography>
        </div>
        <div className="flex gap-2 items-center">
          <Typography className="font-normal text-sm text-gray-700">Tổng tiền:</Typography>
          <Typography className="font-medium text-sm text-orange-900">
            {useFormatMoney(booking.totalAmount)}
          </Typography>
        </div>
        <div className="flex justify-between w-full items-end">
          <div className="flex items-center gap-2">
            <Typography className="text-xs font-normal">Trạng thái:</Typography>
            {isExpired ? (
              <ChipStatus status="Failed" />
            ) : (
              <ChipStatus status={booking.bookingStatus} />
            )}
          </div>
          {!booking.paymentStatus ? (
            isExpired ? (
              <Typography className="text-red-600 text-sm font-semibold">
                Quá thời gian thanh toán
              </Typography>
            ) : (
              <div className="flex flex-col items-end gap-1">
                <Badge>
                  <Button size="sm" variant="filled" color="yellow" className="normal-case">
                    Thanh toán
                  </Button>
                </Badge>
                <CountdownTimer createdAt={booking.createdAt} />
              </div>
            )
          ) : (
            <Link to={`/account/booking-detail/${booking.id}`}>
              <Button size="sm" variant="text" color="blue" className="normal-case">
                Chi tiết
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingItem;
