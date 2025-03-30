import toast from 'react-hot-toast';
import codeMessage from './codeMessage';
import { json } from 'react-router-dom';

const errorHandler = (error) => {
  if (!navigator.onLine) {
    // Code to execute when there is internet connection
    toast.error(`Yêu cầu lỗi: ${successText}`, {
      duration: 2000,
      position: 'top-right',
    });
    return {
      success: false,
      result: null,
      message: 'Không thể kết nối tới máy chủ, hãy kiểm tra mạng internet của bạn',
    };
  }

  const { response } = error;
  if (!response) {
    // Code to execute when there is no internet connection
    toast.error(`Yêu cầu lỗi: Không thể kết nối tới server. Vui lòng thử lại sau`, {
      duration: 2000,
      position: 'top-right',
    });
    return {
      success: false,
      result: null,
      message: 'Không thể kết nối với máy chủ, hãy liên hệ với quản trị viên Tài khoản của bạn',
    };
  }

  if (response && response.data && response.data.jwtExpired) {
    const result = window.localStorage.getItem('auth');
    const jsonFile = window.localStorage.getItem('isLogout');
    const { isLogout } = (jsonFile && JSON.parse(jsonFile)) || false;
    window.localStorage.removeItem('auth');
    window.localStorage.removeItem('isLogout');
    if (result || isLogout) {
      window.location.href = '/logout';
    }
  }
  if (response && response.data) {
    const { code, message } = response.data;
    const errorMessage = message || codeMessage[code] || 'Đã xảy ra lỗi không xác định';

    toast.dismiss();
    toast.error(`Yêu cầu lỗi ${code || response.status || 'Không rõ'}: ${errorMessage}`, {
      duration: 2000,
      position: 'top-right',
    });

    if (response?.data?.error?.name === 'JsonWebTokenError') {
      window.localStorage.removeItem('auth');
      window.localStorage.removeItem('isLogout');
      window.location.href = '/logout';
    } else return response.data;
  }
  if (response && response.status) {
    const message = response.result && response.message;

    const errorText = message || codeMessage[response.status];
    const { status, error } = response;
    toast.dismiss();
    toast.error(`Yêu cầu lỗi ${status}: ${errorText}`, {
      duration: 15000,
      position: 'top-right',
    });

    if (response?.data?.error?.name === 'JsonWebTokenError') {
      window.localStorage.removeItem('auth');
      window.localStorage.removeItem('isLogout');
      window.location.href = '/logout';
    } else return response.data;
  } else {
    if (navigator.onLine) {
      // Code to execute when there is internet connection
      notification.error({
        message: 'Sự cố kết nối với máy chủ',
        description: 'Không thể kết nối tới máy chủ, hãy thử lại sau',
      });
      toast.dismiss();
      toast.error('Không thể kết nối tới máy chủ, hãy thử lại sau', {
        duration: 15000,
        position: 'top-right',
      });
      return {
        success: false,
        result: null,
        message: 'Không thể kết nối với máy chủ, hãy liên hệ với quản trị viên Tài khoản của bạn',
      };
    } else {
      toast.dismiss();
      toast.error('Không thể kết nối Internet, hãy kiểm tra mạng Internet của bạn', {
        duration: 15000,
        position: 'top-right',
      });
      return {
        success: false,
        result: null,
        message: 'Không thể kết nối tới máy chủ, hãy kiểm tra mạng internet của bạn',
      };
    }
  }
};

export default errorHandler;
