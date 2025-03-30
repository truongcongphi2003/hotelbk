import { ArrowLeftIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Button, Alert, Card, CardBody, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-6 w-6 text-red-900"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
      />
    </svg>
  );
}
const PaymentError = () => {
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <Card>
        <CardBody className="md:mx-auto shadow-lg rounded-lg flex flex-col items-center">
          <Alert
            variant="ghost"
            className="bg-yellow-400 bg-opacity-25 text-red-900 font-medium mb-4"
            icon={<ExclamationCircleIcon className="h-6 w-6" color="red" />}
          >
            Có vấn đề thanh toán trong đơn đặt phòng của bạn. Vui lòng kiểm tra lại!
          </Alert>
          <ExclamationTriangleIcon className="h-32 w-32 text-red-700" />
          <div className="text-center">
            <h3 className="md:text-3xl text-2xl text-gray-900 font-semibold">
              Thanh toán thất bại!
            </h3>
            <Typography className="text-gray-600 text-base my-2">
              Có vấn đề về việc thanh toán đơn đặt phòng của bạn. Vui lòng kiểm tra lại!
            </Typography>

            <div className="py-10">
              <Button size="lg" color="white">
                Quay lại thanh toán
              </Button>
            </div>
            <Link to={'/'}>
              <div className="flex gap-1 items-center justify-center text-sm hover:text-blue-gray-900 cursor-pointer">
                <ArrowLeftIcon className="w-4 h-4" />
                <Typography className="font-medium underline text-gray-800">Thoát</Typography>
              </div>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default PaymentError;
