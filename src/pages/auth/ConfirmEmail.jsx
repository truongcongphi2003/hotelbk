import PageLoader from '@/components/PageLoader';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectAuth } from '@/redux/auth/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { confirmEmail, resetAction } from '@/redux/auth/actions';
const ConfirmEmail = () => {
  const { isLoading, isSuccess, current } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');
  const token = queryParams.get('token');
  useEffect(() => {
    if (email && token) {
      dispatch(confirmEmail({ email, token }));
    }
  }, [dispatch, email, token]);

  useEffect(() => {
    if (current.success) navigate('/login');
  }, [current]);
  return (
    <div className="h-screen w-full flex justify-center items-center">
      {isLoading && <PageLoader />}
    </div>
  );
};

export default ConfirmEmail;
