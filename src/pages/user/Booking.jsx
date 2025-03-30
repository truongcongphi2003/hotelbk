import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Typography, CardBody, Step } from '@material-tailwind/react';
import { Menu, MenuHandler, MenuList, MenuItem } from '@material-tailwind/react';
import { useCountries } from 'use-react-countries';
import { Radio } from '@material-tailwind/react';
import { useLocation } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import { ClockIcon } from '@heroicons/react/24/outline';
import useFormatDate from '@/hooks/useFormatDate';
import useFormatMoney from '@/hooks/useFormatMoney';
import { UsersIcon } from '@heroicons/react/24/solid';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useOnFetch from '@/hooks/useOnFetch';
import { request } from '@/request';
import { ConfirmBookingModal } from '@/components/Modal/ConfimBookingModal';

const Booking = () => {
  const [isBookingForOthers, setIsBookingForOthers] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = React.useState(false);
  const location = useLocation();
  const bookingDetails = location.state || {};
  const { hotel, room, roomType, bookingInfo } = bookingDetails;
  const { checkInDate, checkOutDate, nights, rooms } = bookingInfo;
  const { discount, isPayAtHotel, maxAdults, maxChildren, price, taxAndFee } = room;
  const { countries } = useCountries();
  const [country, setCountry] = React.useState(0);
  const { name, flags, countryCallingCode } = countries[country];

  const totalPrice = nights * rooms * price;
  const totalDiscountPrice = nights * rooms * (discount ? discount : price);
  const totalTaxAndFee = nights * rooms * taxAndFee;
  const totalAmount = totalDiscountPrice + totalTaxAndFee;

  const createBooking = async ({ entity, jsonData }) => {
    return await request.post({
      entity,
      jsonData,
    });
  };
  const { result: urlPayment, isLoading: getUrlLoading, onFetch: fetchPayment } = useOnFetch();

  const getUrlPayment = async ({ entity, jsonData }) => {
    return await request.post({
      entity,
      jsonData,
    });
  };
  const { result: bookingResult, isLoading: createLoading, onFetch: fetchBooking } = useOnFetch();

  const formik = useFormik({
    initialValues: {
      email: '',
      fullName: '',
      fullNameOthers: '',
      phoneNumber: '',
      isBookingForOthers: false,
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Tên đầy đủ không được để trống'),
      fullNameOthers: Yup.string().when('isBookingForOthers', {
        is: true,
        then: (schema) => schema.required('Tên khách không được để trống'),
        otherwise: (schema) => schema.notRequired(),
      }),
      phoneNumber: Yup.string().required('Số điện thoại không được để trống'),
      email: Yup.string()
        .required('Email không được để trống')
        .email('Email không hợp lệ')
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          'Email phải có định dạng hợp lệ'
        ),
    }),
    onSubmit: ({ fullName, email, phoneNumber, fullNameOthers }) => {
      const bookingRequest = {
        fullName,
        email,
        phoneNumber,
        fullNameOthers: isBookingForOthers ? fullNameOthers : undefined,
        roomId: room.id,
        roomTypeId: room.roomTypeId,
        hotelId: hotel.id,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        price: room.price,
        discount: room.discount,
        taxAndFee: room.taxAndFee,
        nights: nights,
        quantityRoom: rooms,
      };
      onFinish(bookingRequest);
    },
  });
  const onFinish = (values) => {
    console.log(values);
    fetchBooking(createBooking({ entity: 'booking', jsonData: values }));
  };
  const handleConfirmBooking = () => {
    formik.handleSubmit();
    setIsConfirmModalOpen(false);
  };

  useEffect(() => {
    if (!isBookingForOthers) {
      formik.setFieldValue('fullNameOthers', '', false);
    }
  }, [isBookingForOthers]);

  useEffect(() => {
    if (bookingResult?.methodOfPayment === 'vnpay') {
      const paymentData = {
        amount: bookingResult.totalAmount,
        bookingDescription: `Thanh toán đặt phòng - ${bookingResult.bookingReference}`,
        transactionReference: bookingResult.paymentReference,
        bookingId: bookingResult.id,
      };
      fetchPayment(getUrlPayment({ entity: 'payment/create-payment-url', jsonData: paymentData }));
    } else if (bookingResult?.methodOfPayment === 'athotel') {
    }
  }, [bookingResult]);

  useEffect(() => {
    if (urlPayment) {
      window.location.href = urlPayment;
    }
  }, [urlPayment]);

  return (
    <div className="m-auto h-full bg-gray-50 py-8">
      <form onSubmit={formik.handleSubmit}>
        <div className="mx-auto lg:max-w-screen-xl container flex flex-col-reverse lg:flex-row gap-6">
          <div className="w-full lg:w-2/3 flex flex-col gap-6">
            <Card className="flex flex-col gap-3 rounded-lg shadow-md p-5 border">
              <CardBody>
                <Typography className="font-bold text-gray-900" variant="h5">
                  Thông tin liên hệ
                </Typography>
                <Typography className="text-gray-800 text-xs font-normal mb-6">
                  Hãy điền chính xác tất cả thông tin để đảm bảo bạn nhận được Phiếu xác nhận đặt
                  phòng (E-voucher) qua email của mình.
                </Typography>
                <div className="mb-3 flex flex-col gap-2">
                  <Typography variant="h6" color="blue-gray" className="text-sm">
                    Tên đầy đủ (theo Hộ chiếu/Thẻ căn cước công dân)
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="Nhập họ và tên"
                    className=" !border-t-blue-gray-200 placeholder:!opacity-100 text-gray-900 focus:!border-t-gray-900"
                    labelProps={{
                      className: 'hidden',
                    }}
                    type="text"
                    id="fullName"
                    name="fullName"
                    onChange={formik.handleChange}
                    value={formik.values.fullName}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.fullName && formik.errors.fullName && (
                    <p className="text-red-500 text-xs">{formik.errors.fullName}</p>
                  )}
                  <Typography className="font-normal text-gray-800 text-xs">
                    Vui lòng chỉ dùng chữ cái (A-Z), không có chức danh, ký tự đặc biệt và dấu câu.
                  </Typography>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  <div className="mb-3 flex flex-col gap-2">
                    <Typography variant="h6" color="blue-gray" className="text-sm">
                      Email
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="Nhập Email"
                      className=" !border-t-blue-gray-200 placeholder:!opacity-100 text-gray-900 focus:!border-t-gray-900"
                      labelProps={{
                        className: 'hidden',
                      }}
                      type="email"
                      id="email"
                      name="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="text-red-500 text-xs">{formik.errors.email}</p>
                    )}
                    <Typography className="text-gray-800 font-normal text-xs">
                      Chúng tôi sẽ gửi e-voucher tới email này.
                    </Typography>
                  </div>
                  {/* số điện thoại */}
                  <div className="mb-3 flex flex-col gap-2">
                    <Typography variant="h6" color="blue-gray" className="text-sm">
                      Số điện thoại
                    </Typography>
                    <div className="relative flex w-full max-w-[24rem]">
                      <Menu placement="bottom-start">
                        <MenuHandler>
                          <Button
                            ripple={false}
                            variant="text"
                            color="blue-gray"
                            className="flex h-10 items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3"
                          >
                            <img
                              src={flags.svg}
                              alt={name}
                              className="h-4 w-4 rounded-full object-cover"
                            />
                            {countryCallingCode}
                          </Button>
                        </MenuHandler>
                        <MenuList className="max-h-[20rem] max-w-[18rem]">
                          {countries.map(({ name, flags, countryCallingCode }, index) => {
                            return (
                              <MenuItem
                                key={name}
                                value={name}
                                className="flex items-center gap-2"
                                onClick={() => setCountry(index)}
                              >
                                <img
                                  src={flags.svg}
                                  alt={name}
                                  className="h-5 w-5 rounded-full object-cover"
                                />
                                {name} <span className="ml-auto">{countryCallingCode}</span>
                              </MenuItem>
                            );
                          })}
                        </MenuList>
                      </Menu>
                      <Input
                        type="tel"
                        placeholder="Số điện thoại"
                        onChange={(e) => {
                          e.target.value = e.target.value.replace(/[^0-9]/g, '');
                          formik.handleChange(e);
                        }}
                        className="rounded-l-none placeholder:!opacity-100 !border-t-blue-gray-200 text-gray-900 focus:!border-t-gray-900"
                        labelProps={{
                          className: 'hidden',
                        }}
                        containerProps={{
                          className: 'min-w-0',
                        }}
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formik.values.phoneNumber}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                    {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                      <p className="text-red-500 text-xs">{formik.errors.phoneNumber}</p>
                    )}
                    <Typography className="text-gray-800 font-normal text-xs">
                      ví dụ. +62812345678 gồm Mã quốc gia (+62) và Số di động 0812345678.
                    </Typography>
                  </div>
                </div>
                <div className="flex gap-8">
                  <Radio
                    name="isBookingForOthers"
                    label={
                      <Typography variant="h6" color="blue-gray" className="text-sm font-medium">
                        Tôi là khách lưu trú
                      </Typography>
                    }
                    onChange={() => {
                      setIsBookingForOthers(false);
                      formik.setFieldValue('isBookingForOthers', false);
                    }}
                    value={formik.values.isBookingForOthers}
                    checked={!isBookingForOthers}
                  />
                  <Radio
                    name="isBookingForOthers"
                    label={
                      <Typography variant="h6" color="blue-gray" className="text-sm font-medium">
                        Tôi đặt chỗ cho người khác
                      </Typography>
                    }
                    value={formik.values.isBookingForOthers}
                    onChange={() => {
                      setIsBookingForOthers(true);
                      formik.setFieldValue('isBookingForOthers', true);
                    }}
                    checked={isBookingForOthers}
                  />
                </div>
                {isBookingForOthers && (
                  <div className="mt-3 flex flex-col gap-2">
                    <Typography variant="h6" color="blue-gray" className="text-sm">
                      Tên khách
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="Nhập tên khách"
                      className=" !border-t-blue-gray-200 placeholder:!opacity-100 text-gray-900 focus:!border-t-gray-900"
                      labelProps={{
                        className: 'hidden',
                      }}
                      id="fullNameOthers"
                      name="fullNameOthers"
                      value={formik.values.fullNameOthers}
                      onBlur={formik.handleBlur}
                      onChange={(e) => formik.handleChange(e)}
                    />
                    {formik.touched.fullNameOthers && formik.errors.fullNameOthers && (
                      <p className="text-red-500 text-xs">{formik.errors.fullNameOthers}</p>
                    )}
                  </div>
                )}
              </CardBody>
            </Card>
            <Card className="border">
              <CardBody className="flex flex-col gap-2">
                <Typography variant="h5" className="font-bold ">
                  Chi tiết giá
                </Typography>
                <Typography className="font-normal text-xs mb-4">
                  Thuế và phí là các khoản được Chúng tôi chuyển trả cho khách sạn. Mọi thắc mắc về
                  thuế và hóa đơn, vui lòng tham khảo Điều khoản và Điều kiện của Traveloka để được
                  giải đáp
                </Typography>
                <div className="flex flex-row justify-between">
                  <Typography className="font-medium text-base text-gray-800">Giá phòng</Typography>
                  <Typography className="font-medium text-base text-gray-800">
                    {useFormatMoney(totalDiscountPrice)}
                  </Typography>
                </div>
                <div className="flex flex-row justify-between">
                  <Typography className="font-medium text-base text-gray-800">
                    Thuế và phí
                  </Typography>
                  <Typography className="font-medium text-base text-gray-800">
                    {useFormatMoney(totalTaxAndFee)}
                  </Typography>
                </div>
                <hr />
                {isPayAtHotel ? (
                  <>
                    <div className="flex flex-row justify-between items-center">
                      <Typography className="font-medium text-lg text-gray-900">
                        Thanh toán tại khách sạn
                      </Typography>
                      <Typography className="font-medium text-lg text-orange-900">
                        {useFormatMoney(totalAmount)}
                      </Typography>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <Typography className="font-medium text-base text-green-800">
                        Thanh toán ngay
                      </Typography>
                      <Typography className="font-medium text-base text-green-800">
                        0 VND
                      </Typography>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-row justify-between items-center">
                      <Typography className="font-medium text-lg text-gray-900">
                        Tổng giá
                      </Typography>
                      <Typography className="font-medium text-lg text-orange-900">
                        {useFormatMoney(totalAmount)}
                      </Typography>
                    </div>
                    <div className="flex justify-center items-center gap-1">
                      <ClockIcon className="h-5 w-5 text-blue-600" />
                      <Typography color="blue" className="font-medium text-sm">
                        Bạn chưa bị trừ tiền
                      </Typography>
                    </div>
                  </>
                )}

                <Button
                  loading={createLoading}
                  type="button"
                  fullWidth
                  className="bg-[#DF7212] mt-6"
                  onClick={() => setIsConfirmModalOpen(true)}
                >
                  {isPayAtHotel ? 'Tiếp tục đặt chỗ' : 'Tiếp tục thanh toán'}
                </Button>
                <ConfirmBookingModal
                  loading={createLoading}
                  open={isConfirmModalOpen}
                  onClose={() => setIsConfirmModalOpen(false)}
                  type="submit"
                  onConfirm={handleConfirmBooking}
                />

                <Typography className="font-medium text-xs text-gray-800 text-center">
                  Bằng việc chấp nhận thanh toán, bạn đã đồng ý với{' '}
                  {
                    <span className="underline">
                      <a href="#">Điều khoản & Điều kiện</a>
                    </span>
                  }
                  ,{' '}
                  {
                    <span className="underline">
                      <a href="#">Chính sách quyền riêng tư</a>
                    </span>
                  }{' '}
                  và{' '}
                  {
                    <span className="underline">
                      <a href="#">Quy trình hoàn tiền</a>
                    </span>
                  }{' '}
                  chỗ ở của Chúng tôi.
                </Typography>
              </CardBody>
            </Card>
          </div>
          <div className="w-full lg:w-1/3">
            <Card className="w-full">
              <div>
                <div className="px-3 py-4 flex justify-between">
                  <div className="flex flex-col gap-1">
                    <Typography variant="h6" className="text-sm text-gray-900">
                      {hotel.name}
                    </Typography>
                    <Typography className="text-xs font-medium text-gray-900">
                      ({hotel.name})
                    </Typography>
                    {/* <Typography className="text-xs font-medium text-blue-900">
                    9.1 <span className="text-gray-800 font-xs">(1.036)</span>
                  </Typography> */}
                  </div>
                  <div>
                    <ReactStars
                      count={5}
                      value={hotel.starRating}
                      size={24}
                      isHalf={true}
                      edit={false}
                      activeColor="#ffd700"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <img
                    className="h-40 w-full object-cover object-center overflow-hidden"
                    src={hotel.thumbnail}
                  />
                </div>
              </div>
              <CardBody className="px-3">
                <div className="flex flex-row justify-between  items-center py-2">
                  <div className=" w-fit border border-gray-400 flex flex-col rounded-xl px-3 py-2 items-center">
                    <p className="text-[11px] text-gray-800">Nhận phòng</p>
                    <p className="font-semibold text-[11px] text-gray-900">
                      {useFormatDate(checkInDate)}
                    </p>
                    <p className="text-[11px] text-gray-800">Từ 14:00</p>
                  </div>
                  <div className="grow flex flex-col px-3">
                    <Typography className="text-[11px] font-normal text-gray-800 text-center">
                      {nights} đêm
                    </Typography>
                    <div className="grow flex justify-between items-center ">
                      <Step className="h-[0.3rem] w-[0.3rem] border border-gray-600 bg-transparent" />
                      <div className=" h-[0.05rem] bg-gray-600 grow  justify-center"></div>
                      <Step className="h-[0.3rem] w-[0.3rem] bg-gray-600" />
                    </div>
                  </div>
                  <div className="w-fit border border-gray-400 flex flex-col rounded-xl px-3 py-2  items-center">
                    <p className="text-[11px] text-gray-800">Trả phòng</p>
                    <p className="font-semibold text-[11px] text-gray-900">
                      {' '}
                      {useFormatDate(checkOutDate)}
                    </p>
                    <p className="text-[11px] text-gray-800">Từ 14:00</p>
                  </div>
                </div>
                <div className="flex flex-col mb-2">
                  <Typography className="text-sm font-semibold text-gray-900">
                    {roomType.name}
                  </Typography>
                  <Typography className="text-[10px] font-medium" color="red">
                    Chỉ còn 3 phòng
                  </Typography>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row gap-2">
                    <UsersIcon className="h-4 w-4" />
                    <Typography className="text-xs font-medium">
                      {maxAdults} người lớn, {maxChildren > 0 ? maxChildren + ' trẻ em' : ''}
                    </Typography>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="18px"
                      viewBox="0 -960 960 960"
                      width="18px"
                      fill="#000000"
                    >
                      <path d="M100-220v-220q0-22.38 10.62-43.42Q121.23-504.46 140-518v-102q0-41.92 29.04-70.96Q198.08-720 240-720h170q21.85 0 39.15 8.5Q466.46-703 480-688q13.54-15 30.85-23.5 17.3-8.5 39.15-8.5h170q41.92 0 70.96 29.04Q820-661.92 820-620v102q18.77 13.54 29.38 34.58Q860-462.38 860-440v220h-60v-80H160v80h-60Zm410-320h250v-80q0-17-11.5-28.5T720-660H550q-17 0-28.5 11.5T510-620v80Zm-310 0h250v-80q0-17-11.5-28.5T410-660H240q-17 0-28.5 11.5T200-620v80Zm-40 180h640v-80q0-17-11.5-28.5T760-480H200q-17 0-28.5 11.5T160-440v80Zm640 0H160h640Z" />
                    </svg>
                    <Typography className="text-xs font-medium">
                      {roomType.bedTypes.length > 0
                        ? roomType.bedTypes
                            .map((bed) => bed.quantity + ' ' + bed.bedName)
                            .join(', ')
                        : 'Không có thông tin giường'}
                    </Typography>
                  </div>
                  <div className="flex gap-2"></div>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between">
                  <div className="flex flex-col gap-1">
                    <Typography className="font-semibold text-sm text-gray-900 ">
                      Tổng giá phòng
                    </Typography>
                    <Typography className="font-medium text-xs text-gray-700">
                      {rooms} phòng, {nights} đêm
                    </Typography>
                  </div>
                  <div className="flex flex-col gap-1 items-end">
                    {room.discount && (
                      <Typography className="font-medium text-xs text-gray-900 line-through">
                        {useFormatMoney(totalPrice)}
                      </Typography>
                    )}
                    <Typography className="font-medium text-md text-orange-900">
                      {useFormatMoney(totalAmount)}
                    </Typography>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Booking;
