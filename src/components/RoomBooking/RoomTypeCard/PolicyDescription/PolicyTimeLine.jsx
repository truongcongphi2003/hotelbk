import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
  Typography,
} from '@material-tailwind/react';
import useFormatMoney from '@/hooks/useFormatMoney';
import useFormatDate from '@/hooks/useFormatDate';
import { addDays } from 'date-fns';

export default function PolicyTimeline({ policy, price, discount, checkInDate }) {
  const renderCancellationPolicy = (p, index) => {
    const { minDaysBefore, feePercentage, isRefundable } = p;

    let cancellationFee = price;
    if (discount !== null) {
      cancellationFee = discount;
    }

    let color = '';
    let message = '';
    let day = useFormatDate(addDays(checkInDate, -minDaysBefore), 'dd/MM/yyyy');
    let [hours, minutes, seconds] = p.cutoffTime.split(':');
    if (feePercentage === 0) {
      color = 'green';
      message = `Miễn phí hủy phòng trước ${day}, ${hours + ':' + minutes}`;
    } else if (feePercentage > 0 && feePercentage < 100) {
      color = 'yellow';
      message = `Phí hủy phòng là ${useFormatMoney(
        cancellationFee * (feePercentage / 100)
      )}. Mức phí này áp dụng nếu hủy sau ${day}, ${hours + ':' + minutes}.`;
    } else if (feePercentage === 100) {
      color = 'red';
      message = `Phí hủy phòng là ${useFormatMoney(
        cancellationFee
      )}. Mức phí này áp dụng nếu hủy sau ${day}, ${hours + ':' + minutes}.`;
    }

    return (
      <TimelineItem key={index}>
        {index < policy.length - 1 && <TimelineConnector className="py-1" />}
        <TimelineHeader className="flex items-start">
          <TimelineIcon color={color} />
          <Typography color={color} className="leading-none font-medium text-xs">
            {message}
          </Typography>
        </TimelineHeader>
        <TimelineBody className="pb-3"></TimelineBody>
      </TimelineItem>
    );
  };
  const lastPolicy = policy[policy.length - 1];
  const lastDay = useFormatDate(addDays(checkInDate, -lastPolicy.minDaysBefore), 'dd/MM/yyyy');
  const [lastHours, lastMinutes] = lastPolicy.cutoffTime.split(':');
  return (
    <div className="w-full">
      <Timeline>{policy.map((p, index) => renderCancellationPolicy(p, index))}</Timeline>
      <Typography color="white" className="font-medium text-xs leading-snug">
        Bạn vẫn có thể đổi ngày lưu trú hoặc hủy trước {lastDay}, {lastHours}:{lastMinutes}. Nếu bạn
        thay đổi hoặc hủy sau thời gian trên, bạn có thể phải chịu phí hủy.
      </Typography>
      <Typography variant="small" color="white" className="font-medium text-xs mt-4">
        Thời gian hiển thị là giờ địa phương của khách sạn
      </Typography>
    </div>
  );
}
