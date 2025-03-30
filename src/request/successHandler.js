import toast from 'react-hot-toast';
import codeMessage from './codeMessage';

const successHandler = (response, options = { notifyOnSuccess: false, notifyOnFailed: true }) => {
  const { data } = response;
  if (data && data.success === true) {
    const message = response.data && data.message;
    const successText = message || codeMessage[response.status];

    if (options.notifyOnSuccess) {
      toast.dismiss();
      toast.success(`${successText}`, {
        duration: 2000,
        position: 'top-right',
      });
    }
  } else {
    const message = response.data && data.message;
    const errorText = message || codeMessage[response.status];
    const { status } = response;
    if (options.notifyOnFailed) {
      toast.dismiss();
      toast.success(`Lỗi yêu cầu ${status}: ${errorText}`, {
        duration: 4000,
        position: 'top-right',
      });
    }
  }
};

export default successHandler;
