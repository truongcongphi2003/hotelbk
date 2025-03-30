import React, { useRef } from 'react';
import useFetch from '@/hooks/useFetch';
import { request } from '@/request';
import { useParams } from 'react-router-dom';
import { Card, CardBody, Typography, Button } from '@material-tailwind/react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { BuildingOffice2Icon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import useFormatDate from '@/hooks/useFormatDate';
import { EnvelopeIcon, IdentificationIcon, PhoneIcon } from '@heroicons/react/24/solid';
import useFormatMoney from '@/hooks/useFormatMoney';

const BookingDetail = () => {
  const { id } = useParams();
  const cardRef = useRef();

  const { result, isLoading } = useFetch(() => request.get({ entity: `booking/`, id }));

  const handleExportPDF = async () => {
    const element = cardRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`invoice-${result.bookingReference}.pdf`);
  };

  if (isLoading) return <div>Đang tải...</div>;
  if (!result) return <div>Không tìm thấy hóa đơn.</div>;

  const {
    hotelName,
    hotelThumbnail,
    bookingReference,
    checkInDate,
    checkOutDate,
    totalAmount,
    createdAt,
    fullName,
    fullNameOthers,
    paymentStatus,
    roomTypeName,
    quantityRoom,
    price,
    discount,
    taxAndFee,
    adults,
    children,
    email,
    phoneNumber,
  } = result;

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <Card ref={cardRef} className="w-full max-w-4xl shadow-lg border border-gray-300 p-6">
        <CardBody>
          <div className="flex justify-between items-start border-b pb-4">
            <div className="flex gap-3 flex-1 items-center">
              <BuildingOfficeIcon className="text-blue-700 w-32 h-32" />
              <div>
                <Typography variant="h4" className="font-bold text-gray-900">
                  {hotelName}
                </Typography>
              </div>
            </div>
            <div className="text-right">
              <Typography className="text-sm text-gray-600">
                {useFormatDate(createdAt, 'dd/MM/yyyy')}
              </Typography>
              <Typography className="text-sm font-normal text-gray-600">
                #{bookingReference}
              </Typography>
            </div>
          </div>

          <div className="mt-4"></div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <Typography className="font-normal text-blue-700">Khách hàng:</Typography>
              <div className="text-gray-700 flex items-center gap-2 ">
                <Typography className="text-gray-900  text-base">Họ tên:</Typography>
                <Typography className="text-gray-900  text-base font-medium">{fullName}</Typography>
              </div>
              {fullNameOthers && (
                <div className="text-gray-800 flex items-center gap-2 ">
                  <Typography className="text-base">Đặt hộ:</Typography>
                  <Typography className="text-base font-medium">{fullNameOthers}</Typography>
                </div>
              )}
              <div className="text-gray-900 flex items-center gap-2 ">
                <EnvelopeIcon className="w-4 h-4" />
                <Typography className="text-sm text-nowrap ">{email}</Typography>
              </div>
              <div className="text-gray-900 flex items-center gap-2 ">
                <PhoneIcon className="w-4 h-4" />
                <Typography className="text-sm text-nowrap ">{phoneNumber}</Typography>
              </div>
            </div>
            <div>
              <div className="mb-3">
                <Typography className="font-normal text-blue-700">Nhận phòng</Typography>
                <Typography className="text-gray-900 font-medium">
                  {useFormatDate(checkInDate, 'dd/MM/yyyy')}
                </Typography>
              </div>
              <div>
                <Typography className="font-normal text-blue-700">Trả phòng</Typography>
                <Typography className="text-gray-900 font-medium">
                  {useFormatDate(checkOutDate, 'dd/MM/yyyy')}
                </Typography>
              </div>
            </div>
            <div>
              <Typography className="font-semibold text-gray-700">Booking Details:</Typography>

              <Typography className="text-gray-600">Room Type: {roomTypeName || 'N/A'}</Typography>
              <Typography className="text-gray-600">Rooms: {quantityRoom}</Typography>
              <Typography className="text-gray-600">Adults: {adults}</Typography>
              <Typography className="text-gray-600">Children: {children || 0}</Typography>
            </div>
          </div>
          <hr className="" />
          <table className="w-full">
            <thead>
              <th>Loại phòng</th>
              <th>Người lớn</th>
              <th>Trẻ em</th>
              <th>Số phòng</th>
              <th>Giá</th>
              <th>Phí</th>
              <th>Tổng</th>
            </thead>
            <tbody>
              <tr className="text-center">
                <td>{roomTypeName}</td>
                <td>{adults}</td>
                <td>{children ? children : ''}</td>
                <td>{quantityRoom}</td>
                <td className="text-end">
                  <div>
                    {discount ? (
                      <div className="flex flex-col">
                        <Typography>{useFormatMoney(price)}</Typography>
                        <Typography>{useFormatMoney(discount)}</Typography>
                      </div>
                    ) : (
                      <Typography>{useFormatMoney(price)}</Typography>
                    )}
                  </div>
                </td>
                <td>{useFormatMoney(taxAndFee)}</td>
                <td className="text-end">{useFormatMoney(totalAmount)}</td>
              </tr>
            </tbody>
          </table>

          <div className="mt-6 border-t pt-4">
            <Typography className="font-semibold text-gray-700">Amount Due (VND):</Typography>
            <Typography className="text-2xl font-bold text-blue-600">
              {totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
            </Typography>
          </div>

          <div className="mt-6 border-t pt-4">
            <Typography className="text-gray-600">
              Payment Status: {paymentStatus ? 'Paid' : 'Unpaid'}
            </Typography>
          </div>
        </CardBody>
      </Card>

      <Button variant="gradient" color="blue" onClick={handleExportPDF}>
        Xuất PDF
      </Button>
    </div>
  );
};

export default BookingDetail;
