import React from 'react';
import { useEffect } from 'react';
import { Input, Button, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { selectAuth } from '@/redux/auth/selectors';
import { resetPassword } from '@/redux/auth/actions';

const ResetPassword = () => {
  const { isLoading, isSuccess } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');
  const token = queryParams.get('token');
  console.log(email);
  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .required('Mật khẩu không được để trống')
        .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
          'Mật khẩu phải có ít nhất 1 chữ cái thường, 1 chữ cái in hoa, 1 số và 1 ký tự đặc biệt (@$!%*?&)'
        ),
      confirmPassword: Yup.string()
        .required('Vui lòng xác nhận mật khẩu')
        .oneOf([Yup.ref('newPassword'), null], 'Xác nhận mật khẩu không khớp'),
    }),
    onSubmit: (values) => {
      dispatch(resetPassword({ resetPasswordData: { email, token, ...values } }));
    },
  });
  useEffect(() => {
    if (isSuccess) navigate('/login');
  }, [isSuccess]);
  return (
    <section className="m-8 flex">
      <div className="w-full md:px-24 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Đổi Mật khẩu
          </Typography>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg md:w-1/2 lg:w-1/3"
        >
          <div className="mb-1 flex flex-col gap-4">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Mật khẩu<span className="text-red-500">*</span>
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              name="newPassword"
              onChange={formik.handleChange}
              value={formik.values.newPassword}
              onBlur={formik.handleBlur}
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <p className="text-red-500 text-sm">{formik.errors.newPassword}</p>
            )}
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Xác nhận mật khẩu<span className="text-red-500">*</span>
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              name="confirmPassword"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
            )}
          </div>

          <Button loading={isLoading} type="submit" className="mt-6" fullWidth>
            Xác nhận
          </Button>

          <Typography
            variant="paragraph"
            className="text-center text-blue-gray-500 font-normal mt-4"
          >
            Đã có tài khoản?
            <Link to="/login" className="text-gray-900 font-medium ml-1 hover:underline">
              Đăng nhập
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
