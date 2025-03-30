import React from 'react';

const useFormatMoney = (money) => {
  if (!money) return '';
  if (Number.isInteger(money)) {
    return money.toLocaleString('vi-VN').replace(/,/g, '.') + ' VND';
  }
  return money.toLocaleString('vi-VN', { minimumFractionDigits: 2 }).replace(/\./g, ',') + ' VND';
};
export default useFormatMoney;
