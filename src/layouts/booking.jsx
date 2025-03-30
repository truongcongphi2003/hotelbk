import React, { useEffect } from 'react';
import { Navbar, Collapse, Typography, IconButton } from '@material-tailwind/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Outlet, Link } from 'react-router-dom';
import { Stepper, Step } from '@material-tailwind/react';
import { useLocation } from 'react-router-dom';
function NavList() {
  const location = useLocation();
  const [activeStep, setActiveStep] = React.useState(0);
  useEffect(() => {
    const pathToStep = {
      '/booking': 0,
      '/payment': 1,
      '/confirm': 2,
    };

    // Cập nhật bước dựa trên đường dẫn hiện tại
    setActiveStep(pathToStep[location.pathname]);
  }, [location.pathname]);

  return (
    <Stepper activeStep={activeStep} className="w-60 mr-6">
      <Step className={`w-5 h-5 text-xs`}>
        1
        <div className="absolute -bottom-[20px] w-max text-center">
          <Typography
            variant="h6"
            className="text-xs"
            color={activeStep === 0 ? 'blue-gray' : 'gray'}
          >
            Đặt
          </Typography>
        </div>
      </Step>
      <Step className="w-5 h-5 text-xs">
        2
        <div className="absolute -bottom-[20px] w-max text-center">
          <Typography
            variant="h6"
            className="text-xs"
            color={activeStep === 1 ? 'blue-gray' : 'gray'}
          >
            Thanh toán
          </Typography>
        </div>
      </Step>
      <Step className="w-5 h-5 text-xs">
        3
        <div className="absolute -bottom-[20px] w-max text-center">
          <Typography
            variant="h6"
            className="text-xs"
            color={activeStep === 2 ? 'blue-gray' : 'gray'}
          >
            Gửi phiếu xác nhận
          </Typography>
        </div>
      </Step>
    </Stepper>
  );
}

export function Booking() {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () => window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <div className="relative">
      <Navbar className="sticky  top-0 rounded-none mx-auto min-w-full z-[999]">
        <div className="container mx-auto">
          <div className="flex items-center justify-between text-blue-gray-900">
            <Link to={'/'}>
              <Typography variant="h6" className="mr-4 cursor-pointer py-1.5">
                HotelBk
              </Typography>
            </Link>

            <div className="hidden lg:block">
              <NavList />
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <XMarkIcon className="h-6 w-6" strokeWidth={2} />
              ) : (
                <Bars3Icon className="h-6 w-6" strokeWidth={2} />
              )}
            </IconButton>
          </div>
          <Collapse open={openNav}>
            <NavList />
          </Collapse>
        </div>
      </Navbar>
      <Outlet />
    </div>
  );
}
