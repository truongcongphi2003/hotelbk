import { Login, Register, Logout } from '@/pages/auth';
import { Home, HotelDetail } from '@/pages/user';
import Booking from './pages/user/Booking';
import ConfirmEmail from './pages/auth/ConfirmEmail';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Payment from './pages/user/Payment';
import Confirmation from './pages/user/Confirmation';
import Account from './pages/user/Account';
import BookingList from './components/BookingList';
import BookingHistory from './components/BookingHistory';
import BookingDetail from './pages/user/BookingDetail';
export const routes = [
  {
    layout: 'default',
    pages: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/hotel/:id',
        element: <HotelDetail />,
      },
      {
        path: '/booking/:id',
        element: <Booking />,
      },
      {
        path: '/account',
        element: (
          <Account>
            <BookingList />
          </Account>
        ),
      },
      {
        path: '/account/bookings',
        element: (
          <Account>
            <BookingList />
          </Account>
        ),
      },
      {
        path: '/account/booking-list',
        element: (
          <Account>
            <BookingHistory />
          </Account>
        ),
      },
      {
        path: '/account/booking-detail/:id',
        element: (
          <Account>
            <BookingDetail />
          </Account>
        ),
      },
    ],
  },
  {
    layout: 'booking',
    pages: [
      {
        path: '/booking/:id',
        element: <Booking />,
      },
      {
        path: '/payment',
        element: <Payment />,
      },
      {
        path: '/confirm',
        element: <Confirmation />,
      },
    ],
  },
  {
    layout: 'auth',
    pages: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/logout',
        element: <Logout />,
      },
      {
        path: '/ConfirmEmail',
        element: <ConfirmEmail />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: '/resetpassword',
        element: <ResetPassword />,
      },
    ],
  },
];

export default routes;
