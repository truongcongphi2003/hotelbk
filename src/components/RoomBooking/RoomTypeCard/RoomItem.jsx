import React from 'react';
import { Typography, Tooltip, Button } from '@material-tailwind/react';
import useFormatMoney from '@/hooks/useFormatMoney';
import PolicyDescription from './PolicyDescription';
import { GiftIcon, UserIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

const RoomItem = ({ roomType, room, hotel, bookingInfo, classes }) => {
  const { checkInDate, checkOutDate, nights, rooms } = bookingInfo;

  const { discount, price, taxAndFee } = room;
  const totalPrice = nights * rooms * price;
  const totalDiscountPrice = nights * rooms * (discount ? discount : price);
  const totalTaxAndFee = nights * rooms * taxAndFee;
  const totalAmount = totalDiscountPrice + totalTaxAndFee;
  const navigate = useNavigate();

  const handleSelectRoom = () => {
    const bookingDetails = {
      hotel,
      room,
      roomType,
      bookingInfo,
    };
    navigate(`/booking/${room.id}`, { state: bookingDetails });
  };
  return (
    <tr>
      <td className={`border border-s-0 ${classes}`}>
        <div className="flex flex-col gap-2">
          <Typography variant="small" className="font-normal text-xs text-gray-700">
            {room.roomTypeName}
          </Typography>
          <Typography variant="small" className="font-semibold text-md text-gray-900">
            {room.name}
          </Typography>
          {roomType.bedTypes.length > 0 && (
            <div className="flex gap-2">
              {roomType.bedTypes.map((bed, index) => (
                <span key={index} dangerouslySetInnerHTML={{ __html: bed.icon }} />
              ))}
              {roomType.bedTypes.map((bed, index) => (
                <Typography key={index} className="font-normal text-xs text-gray-700">
                  {bed.quantity} {bed.bedName}
                </Typography>
              ))}
            </div>
          )}
          {room.gift && (
            <div className={`flex items-center gap-2`}>
              <GiftIcon className="w-4 h-4" color="red" />
              <Typography className="font-semibold text-xs text-red-700">{room.gift}</Typography>
              <Tooltip
                placement="bottom"
                className="max-w-96 py-2"
                content={
                  <span
                    dangerouslySetInnerHTML={{
                      __html: room.giftDescription,
                    }}
                  />
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="-ms-1 h-4 w-4 cursor-pointer text-red-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
              </Tooltip>
            </div>
          )}
          {!room.isCancelable && (
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-check"></i>
              <Typography className="font-medium text-xs text-gray-700">
                Đặt phòng này không được hoàn tiền.
              </Typography>
              <Tooltip
                placement="bottom"
                content={
                  <div className="max-w-96">
                    <Typography variant="small" color="white" className="font-medium text-xs">
                      Đặt phòng này không được hoàn tiền
                    </Typography>
                  </div>
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="-ms-1 h-4 w-4 cursor-pointer text-blue-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
              </Tooltip>
            </div>
          )}
          {room.isPayAtHotel && (
            <div className="flex gap-2">
              <i className="fa-solid fa-check text-blue-700"></i>
              <div className={`flex flex-col`}>
                <div className="flex gap-2">
                  <Typography className="font-semibold text-xs text-blue-700">
                    Thanh Toán Tại Khách Sạn
                  </Typography>
                  <Tooltip
                    placement="bottom"
                    className="w-96 py-2"
                    content={
                      <div className="flex flex-col gap-2">
                        <Typography className="text-xs font-medium">
                          Áp dụng Thanh Toán Tại Khách Sạn
                        </Typography>
                        <Typography className="text-xs font-normal">
                          Đặt chỗ ngay và thanh toán trực tiếp khi bạn làm thủ tục nhận phòng tại
                          nơi lưu trú. Chỉ cần thẻ tín dụng hoặc thẻ PayLater để đảm bảo đặt chỗ của
                          bạn.
                        </Typography>
                      </div>
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      className="-ms-1 h-4 w-4 cursor-pointer text-blue-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                      />
                    </svg>
                  </Tooltip>
                </div>
                <Typography className="text-xs font-normal text-blue-600">
                  Thanh toán khi bạn nhận phòng tại nơi ở
                </Typography>
              </div>
            </div>
          )}
          {room.cancellationPolicies && room.cancellationPolicies.length > 0 && (
            <PolicyDescription room={room} checkInDate={checkInDate} />
          )}
        </div>
      </td>
      <td className={`border ${classes}`}>
        <div className="flex justify-center items-center gap-1">
          {room.maxAdults && room.maxAdults < 3 ? (
            Array.from({ length: room.maxAdults }).map((_, index) => (
              <UserIcon key={index} className="h-4 w-4" />
            ))
          ) : (
            <div className="flex gap-0 p-0 m-0 text-xs">
              <UserIcon className="h-4 w-4" />
              {room.maxAdults}
            </div>
          )}

          {room.maxChildren > 0 && (
            <div className="flex items-center gap-0 p-0 m-0 text-xs">
              <i className="fa-solid fa-child text-sm"></i>
              {room.maxChildren > 1 ? room.maxChildren : ''}
            </div>
          )}
        </div>
      </td>
      <td className={`border ${classes}`}>
        <div className="flex flex-col gap-1 items-end">
          {/* <Chip
    color="red"
    value="+COUPOUN 30%"
    className="w-fit rounded-full"
  /> */}
          {room.discount ? (
            <>
              <Typography className="font-medium text-xs text-gray-700 line-through">
                {useFormatMoney(totalPrice)}
              </Typography>
              <Tooltip
                placement="bottom"
                className="w-96 py-3"
                content={
                  <div className="flex flex-col font-medium text-sm gap-2">
                    <div>
                      Giá cho {rooms} phòng {nights} đêm
                    </div>

                    {Array.from({ length: nights }).map((_, index) => (
                      <div key={index} className="flex justify-between">
                        <div>Đêm {index + 1}</div>
                        <div>{useFormatMoney(totalDiscountPrice)}</div>
                      </div>
                    ))}

                    <hr />

                    <div className="flex justify-between">
                      <div>Giá phòng</div>
                      <div>{useFormatMoney(totalDiscountPrice)}</div>
                    </div>

                    <div className="flex justify-between">
                      <div>Thuế và phí</div>
                      <div>{useFormatMoney(totalTaxAndFee)}</div>
                    </div>

                    <hr />

                    {room.isPayAtHotel ? (
                      <>
                        <div className="flex justify-between">
                          <div>Thanh toán tại khách sạn</div>
                          <div>{useFormatMoney(totalAmount)}</div>
                        </div>
                        <hr />
                        <div className="flex justify-between">
                          <div>Thanh toán ngay</div>
                          <div>0 VND</div>
                        </div>
                      </>
                    ) : (
                      <div className="flex justify-between">
                        <div>Tổng giá tiền</div>
                        <div>{useFormatMoney(totalAmount)}</div>
                      </div>
                    )}
                  </div>
                }
              >
                <Typography className="font-medium text-lg text-orange-900">
                  {useFormatMoney(totalDiscountPrice)}
                </Typography>
              </Tooltip>
            </>
          ) : (
            <Typography className="font-medium text-lg text-orange-900">
              {useFormatMoney(totalPrice)}
            </Typography>
          )}
          <Typography className="font-medium text-xs text-gray-700">
            Chưa bao gồm thuế và phí
          </Typography>
        </div>
      </td>
      <td className={`${classes} border border-r-0`}>
        <div className="flex justify-center items-center">
          <Button color="blue" onClick={handleSelectRoom}>
            Chọn
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default RoomItem;
