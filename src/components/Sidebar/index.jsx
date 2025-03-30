import React from 'react';
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Avatar,
  IconButton,
  Drawer,
} from '@material-tailwind/react';
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from '@heroicons/react/24/solid';
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

import { selectAuth } from '@/redux/auth/selectors';
import { useSelector } from 'react-redux';
export function Sidebar() {
  const { current, isLoggedIn } = useSelector(selectAuth);
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const avatar =
    current?.avatar ??
    'https://icons.veryicon.com/png/o/education-technology/technology-big-data-visualization/user-149.png';
  const [openSide, setOpenSide] = React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenSide(true);
        setIsDrawerOpen(false);
      } else {
        setOpenSide(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize); // Cleanup
  }, []);
  function ListSide() {
    return (
      <Card className="h-full w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 z-[9999]">
        <div className="mb-2 flex items-center gap-4 p-4">
          <Avatar size="xl" src={avatar} />
          <Typography variant="h5" color="blue-gray">
            {current.firstName}
            {current.lastName}
          </Typography>
        </div>
        <List>
          <Accordion
            open={open === 0}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? 'rotate-180' : ''}`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 1}>
              <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                <ListItemPrefix>
                  <PresentationChartBarIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  Hóa đơn
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <ListItem>Đặt chỗ của tôi</ListItem>
                <ListItem>Danh sách giao dịch</ListItem>
                <ListItem>Hoàn tiền</ListItem>
              </List>
            </AccordionBody>
          </Accordion>

          <hr className="my-2 border-blue-gray-50" />
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Tài khoản
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Settings
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>
    );
  }

  return (
    <>
      {!openSide ? (
        <>
          <IconButton variant="text" size="lg" onClick={openDrawer}>
            {isDrawerOpen ? (
              <XMarkIcon className="h-8 w-8 stroke-2" />
            ) : (
              <Bars3Icon className="h-8 w-8 stroke-2" />
            )}
          </IconButton>
          <Drawer open={isDrawerOpen} onClose={closeDrawer}>
            <ListSide />
          </Drawer>{' '}
        </>
      ) : (
        <ListSide />
      )}
    </>
  );
}
