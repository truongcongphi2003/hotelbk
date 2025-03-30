import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { IconButton } from '@material-tailwind/react';
import { NavbarWithMegaMenu, Footer } from '@/widgets/layout';
import { Outlet } from 'react-router-dom';
export function Default() {
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <NavbarWithMegaMenu />
      <IconButton
        size="lg"
        color="white"
        className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
        ripple={false}
      >
        <Cog6ToothIcon className="h-5 w-5" />
      </IconButton>
      <Outlet />
      <div className="text-blue-gray-600">
        <Footer />
      </div>
    </div>
  );
}

export default Default;
