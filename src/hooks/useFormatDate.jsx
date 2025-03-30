import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

/**
 * Custom hook để định dạng ngày tháng theo ngôn ngữ Việt Nam.
 * @param {Date | null} date - Ngày cần định dạng.
 * @param {string} formatStr - Chuỗi định dạng (mặc định: 'PPP').
 * @returns {string} - Ngày đã được định dạng.
 */
const useFormatDate = (date, formatStr = 'EEEE, d MMM yyyy') => {
  return date ? format(date, formatStr, { locale: vi }) : '';
};

export default useFormatDate;
