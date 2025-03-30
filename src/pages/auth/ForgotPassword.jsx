import React from 'react';
import { Card, Input, Button, CardBody, CardHeader, Typography } from '@material-tailwind/react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectAuth } from '@/redux/auth/selectors';
import { forgotPassword } from '@/redux/auth/actions';

const ForgotPassword = () => {
  const { isLoading, isSuccess } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Email không được để trống')
        .email('Email không hợp lệ')
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          'Email phải có định dạng hợp lệ'
        ),
    }),
    onSubmit: (values) => {
      dispatch(forgotPassword({ forgotPasswordData: values }));
    },
  });

  return (
    <div className="w-full h-screen flex justify-center">
      <Card shadow={false} className="md:px-24 md:py-14 py-8">
        <CardHeader shadow={false} floated={false} className="text-center">
          <Typography variant="h1" color="blue-gray" className="mb-4 !text-3xl lg:text-4xl">
            Quên mật khẩu
          </Typography>
          <Typography className="!text-gray-600 text-[18px] font-normal md:max-w-sm">
            Vui lòng nhập email của bạn, Chúng tôi sẽ gửi một đường link hướng dẫn đặt mật khẩu mới{' '}
          </Typography>
        </CardHeader>
        <CardBody>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 md:mt-12">
            <div>
              <label htmlFor="email">
                <Typography variant="small" color="blue-gray" className="block font-medium mb-2">
                  Email<span className="text-red-500">*</span>
                </Typography>
              </label>
              <Input
                id="email"
                color="gray"
                size="lg"
                type="email"
                name="email"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 placeholder:!opacity-100 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email && (
                <p className="mt-2 text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>
            <Button
              className="flex justify-center"
              loading={isLoading}
              type="submit"
              size="lg"
              color="gray"
              fullWidth
            >
              Tiếp tục
            </Button>

            <Typography
              variant="small"
              className="text-center mx-auto max-w-[19rem] !font-medium !text-gray-600"
            >
              Quay lại{' '}
              <Link to="/login" className="text-gray-900 font-medium ml-1 hover:underline">
                Đăng nhập
              </Link>
            </Typography>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default ForgotPassword;
