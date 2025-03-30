import { Sidebar } from '@/components/Sidebar';
import React from 'react';

const Account = ({ children }) => {
  return (
    <div className="sticky container mx-auto h-full flex gap-4">
      <div className="sticky top-12 h-[calc(100vh-3rem)]">
        <Sidebar />
      </div>

      <div className="w-full rounded-xl overflow-hidden">{children}</div>
    </div>
  );
};

export default Account;
