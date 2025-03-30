import { Spinner } from '@material-tailwind/react';

export function Loading({ isLoading, children }) {
  if (!isLoading) return children;

  return (
    <div className="relative w-full ">
      {children}
      <div className="absolute inset-0 flex justify-center items-center">
        <Spinner className="h-12 w-12" />
      </div>
    </div>
  );
}

export default Loading;
