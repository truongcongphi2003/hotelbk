import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 max-h-screen h-screen flex justify-center items-center">
      <Card className="w-96 h-50">
        <CardBody className="text-center">
          <Typography variant="h3">Lỗi 404</Typography>
          <Typography>Xin lỗi, trang bạn yêu cầu không tồn tại</Typography>
        </CardBody>
        <CardFooter className="flex justify-center">
          <Button
            color="blue"
            variant="text"
            onClick={() => {
              navigate('/');
            }}
          >
            Quay lại
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
