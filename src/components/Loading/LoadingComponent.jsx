import { Spinner } from '@material-tailwind/react';
import React from 'react';

const LoadingComponent = () => {
  return (
    <div className="w-full h-full bg-black opacity-25 animate-pulse flex justify-center items-center">
      <Spinner className="w-16 h-16" />
    </div>
  );
};

export default LoadingComponent;
