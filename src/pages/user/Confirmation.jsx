import PaymentError from '@/components/Payment/PaymentError';
import PaymentSuccess from '@/components/Payment/PaymentSuccess';
import { useLocation } from 'react-router-dom';
const Confirmation = () => {
  const location = useLocation();

  const isSuccess = location.state || false;
  return <>{isSuccess ? <PaymentSuccess /> : <PaymentError />}</>;
};

export default Confirmation;
