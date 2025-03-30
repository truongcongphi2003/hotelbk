import { useLocation } from 'react-router-dom';
import useOnFetch from '@/hooks/useOnFetch';
import { request } from '@/request';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner, Typography } from '@material-tailwind/react';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const paymentCallBack = async ({ entity, options }) => {
    return await request.summary({
      entity,
      options,
    });
  };
  const { result, isLoading, onFetch: fetchPaymentCallBack } = useOnFetch();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const paymentData = Object.fromEntries(queryParams.entries());

    fetchPaymentCallBack(
      paymentCallBack({ entity: 'payment/payment-callback', options: paymentData })
    );
  }, [location.search]);
  useEffect(() => {
    if (result) {
      navigate('/confirm', { state: result.vnPayResponseCode == '00' ?? false });
    }
  }, [result]);

  return (
    <>
      <div className="fixed inset-0 w-full h-screen bg-black bg-opacity-25 flex flex-col gap-2 justify-center items-center z-[9998]">
        <Spinner className="h-16 w-16  z-[9999]" />
        <Typography className="font-normal">Xác nhận thanh toán...</Typography>
      </div>
    </>
  );
};

export default Payment;
