import { useEffect } from 'react';
import { Input, Checkbox, Button, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import Loading from '@/components/Loading';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { register } from '@/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectAuth } from '@/redux/auth/selectors';

export function Register() {
  const { isLoading, isSuccess } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Họ không được để trống'),
      lastName: Yup.string().required('Tên không được để trống'),
      email: Yup.string()
        .required('Email không được để trống')
        .email('Email không hợp lệ')
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          'Email phải có định dạng hợp lệ'
        ),
      password: Yup.string()
        .required('Mật khẩu không được để trống')
        .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
          'Mật khẩu phải có ít nhất 1 chữ cái thường, 1 chữ cái in hoa, 1 số và 1 ký tự đặc biệt (@$!%*?&)'
        ),
    }),
    onSubmit: (values) => {
      onFinish(values);
    },
  });
  const onFinish = (values) => {
    dispatch(register({ registerData: values }));
  };
  useEffect(() => {
    if (isSuccess) navigate('/login');
  }, [isSuccess]);
  return (
    <section className="m-8 flex">
      <div className="w-2/5 h-full hidden lg:block">
        <img src="/img/pattern.png" className="h-full w-full object-cover rounded-3xl" />
      </div>

      <div className="w-full lg:w-3/5 ">
        <Loading isLoading={isLoading}>
          <div className="w-full flex flex-col items-center justify-center">
            <div className="text-center">
              <Typography variant="h2" className="font-bold mb-4 mt-8">
                Đăng ký
              </Typography>
            </div>
            <form
              onSubmit={formik.handleSubmit}
              className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
            >
              <div className="mb-1 flex flex-col gap-4">
                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                  Họ<span className="text-red-500">*</span>
                </Typography>
                <Input
                  size="lg"
                  placeholder="Họ của bạn"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: 'before:content-none after:content-none',
                  }}
                  type="text"
                  id="firstName"
                  name="firstName"
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <p className="text-red-500 text-sm">{formik.errors.firstName}</p>
                )}

                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                  Tên<span className="text-red-500">*</span>
                </Typography>
                <Input
                  size="lg"
                  placeholder="Tên của bạn"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: 'before:content-none after:content-none',
                  }}
                  type="text"
                  id="lastName"
                  name="lastName"
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <p className="text-red-500 text-sm">{formik.errors.lastName}</p>
                )}

                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                  Email
                </Typography>
                <Input
                  size="lg"
                  placeholder="name@mail.com"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: 'before:content-none after:content-none',
                  }}
                  type="email"
                  id="email"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.errors.email && (
                  <p className="text-red-500 text-sm">{formik.errors.email}</p>
                )}

                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                  Mật khẩu
                </Typography>
                <Input
                  type="password"
                  size="lg"
                  placeholder="********"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: 'before:content-none after:content-none',
                  }}
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {formik.errors.password && (
                  <p className="text-red-500 text-sm">{formik.errors.password}</p>
                )}
              </div>
              <Checkbox
                label={
                  <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center justify-start font-medium"
                  >
                    Tôi đồng ý với &nbsp;
                    <a
                      href="#"
                      className="font-normal text-black transition-colors hover:text-gray-900 underline"
                    >
                      Điều khoản và điều kiện
                    </a>
                  </Typography>
                }
                containerProps={{ className: '-ml-2.5' }}
              />
              <Button
                loading={isLoading}
                type="submit"
                className="mt-6 flex justify-center"
                fullWidth
              >
                Đăng ký ngay
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
        </Loading>
      </div>
    </section>
  );
}

export default Register;
