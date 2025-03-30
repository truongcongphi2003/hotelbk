import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Checkbox, Button, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { login } from '@/redux/auth/actions';
import { selectAuth } from '@/redux/auth/selectors';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '@/components/Loading';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export function Login() {
  console.log('begin login ');
  const { isLoading, isSuccess, isLoggedIn } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
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
      onFinish(values);
      console.log(values);
    },
  });
  const onFinish = (values) => {
    dispatch(login({ loginData: values }));
  };

  useEffect(() => {
    if (isSuccess && isLoggedIn) navigate('/');
  }, [isSuccess, isLoggedIn]);

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 pt-24">
        <Loading isLoading={isLoading}>
          <div className="flex flex-col w-full">
            <div className="text-center">
              <Typography variant="h2" className="font-bold mb-4">
                Đăng nhập
              </Typography>
              {/* <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
            Có thể đăng nhập: admin@gmail.com - @Admin123
          </Typography> */}
            </div>
            <form
              onSubmit={formik.handleSubmit}
              className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
            >
              <div className="mb-1 flex flex-col gap-6">
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
                  type="text"
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
              </div>
              <div className="flex items-center justify-between gap-2 mt-6">
                <Checkbox
                  label={
                    <Typography
                      variant="small"
                      color="gray"
                      className="flex items-center justify-start font-medium"
                    >
                      Nhớ đăng nhập
                    </Typography>
                  }
                  containerProps={{ className: '-ml-2.5' }}
                />
                <Typography variant="small" className="font-medium text-gray-900 hover:underline">
                  <Link to="/forgot-password">Quên mật khẩu?</Link>
                </Typography>
              </div>
              <Button
                loading={isLoading}
                type="submit"
                className="mt-6 flex justify-center"
                fullWidth
              >
                Đăng nhập
              </Button>

              <Typography
                variant="paragraph"
                className="text-center text-blue-gray-500 font-normal mt-4"
              >
                Chưa có tài khoản?
                <Link to="/register" className="text-gray-900 font-medium ml-1 hover:underline">
                  Đăng ký
                </Link>
              </Typography>
            </form>
          </div>
        </Loading>
      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img src="/img/pattern.png" className="h-full w-full object-cover rounded-3xl" />
      </div>
    </section>
  );
}

export default Login;
