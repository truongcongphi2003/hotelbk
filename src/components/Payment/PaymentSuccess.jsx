import { ArrowLeftIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { Button, Alert, Card, CardBody, Typography } from '@material-tailwind/react';

const PaymentSuccess = () => {
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <Card>
        <CardBody className="md:mx-auto shadow-lg rounded-lg">
          <Alert
            variant="ghost"
            className="bg-green-500 bg-opacity-25 text-green-900 font-medium"
            icon={<ExclamationCircleIcon className="h-6 w-6" color="green" />}
          >
            Phiếu xác nhận hóa đơn đặt phòng đã được gửi tới hòm thư của bạn!
          </Alert>
          <svg viewBox="0 0 24 24" className="text-green-500 w-32 h-32 mx-auto my-6">
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            />
          </svg>
          <div className="text-center">
            <h3 className="md:text-3xl text-2xl text-gray-900 font-semibold">
              Thanh toán thành công!
            </h3>
            <Typography className="text-gray-600 text-base my-2">
              Cảm ơn bạn đã hoàn tất thanh toán trực tuyến.
            </Typography>

            <div className="py-10">
              <Button href="#" className="px-12 bg-indigo-600 hover:bg-indigo-500 font-semibold">
                Xem đơn đặt
              </Button>
            </div>
            <div className="flex gap-2 items-center justify-center text-sm hover:text-blue-gray-900 cursor-pointer">
              <ArrowLeftIcon className="w-5 h-5" />
              <Typography className="font-medium underline">Tiếp tục đặt phòng</Typography>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
