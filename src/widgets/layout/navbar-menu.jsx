import React from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  Input,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from '@material-tailwind/react';
import {
  UserCircleIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import {
  Bars4Icon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  GlobeAmericasIcon,
  NewspaperIcon,
  PhoneIcon,
  RectangleGroupIcon,
  SquaresPlusIcon,
  SunIcon,
  TagIcon,
  UserGroupIcon,
} from '@heroicons/react/24/solid';
import { selectAuth } from '@/redux/auth/selectors';
import { useSelector } from 'react-redux';
const navListMenuItems = [
  {
    title: 'Products',
    description: 'Find the perfect solution for your needs.',
    icon: SquaresPlusIcon,
  },
  {
    title: 'About Us',
    description: 'Meet and learn about our dedication',
    icon: UserGroupIcon,
  },
  {
    title: 'Blog',
    description: 'Find the perfect solution for your needs.',
    icon: Bars4Icon,
  },
  {
    title: 'Services',
    description: 'Learn how we can help you achieve your goals.',
    icon: SunIcon,
  },
  {
    title: 'Support',
    description: 'Reach out to us for assistance or inquiries',
    icon: GlobeAmericasIcon,
  },
  {
    title: 'Contact',
    description: 'Find the perfect solution for your needs.',
    icon: PhoneIcon,
  },
];
const profileMenuItems = [
  {
    label: <Link to="/account">Tài khoản</Link>,
    icon: UserCircleIcon,
  },
  {
    label: 'Edit Profile',
    icon: Cog6ToothIcon,
  },
  {
    label: <Link to="/logout">Đăng xuất</Link>,
    icon: PowerIcon,
  },
];
function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const renderItems = navListMenuItems.map(({ icon, title, description }, key) => (
    <a href="#" key={key}>
      <MenuItem className="flex items-center gap-3 rounded-lg">
        <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
          {' '}
          {React.createElement(icon, {
            strokeWidth: 2,
            className: 'h-6 text-gray-900 w-6',
          })}
        </div>
        <div>
          <Typography
            variant="h6"
            color="blue-gray"
            className="flex items-center text-sm font-bold"
          >
            {title}
          </Typography>
          <Typography variant="paragraph" className="text-xs !font-medium text-blue-gray-500">
            {description}
          </Typography>
        </div>
      </MenuItem>
    </a>
  ));

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              List
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? 'rotate-180' : ''
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">{renderItems}</ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}

function NavList() {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
        <ListItem className="flex items-center gap-2 py-2 pr-4">Khách sạn</ListItem>
      </Typography>
      <NavListMenu />
      <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
        <ListItem className="flex items-center gap-2 py-2 pr-4">Liên hệ</ListItem>
      </Typography>
    </List>
  );
}
function ProfileMenu({ user }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            src={
              user?.avatar
                ? user.avatar
                : 'https://icons.veryicon.com/png/o/education-technology/technology-big-data-visualization/user-149.png'
            }
            className="border border-gray-900 p-0.5"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem ? 'hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10' : ''
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? 'text-red-500' : ''}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? 'red' : 'inherit'}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export function NavbarWithMegaMenu() {
  const { isLoggedIn } = useSelector(selectAuth);
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  return (
    <div className="sticky top-0 z-[999] flex w-full items-center ">
      <Navbar className="mx-auto h-max max-w-full rounded-none px-8 py-1.5 lg:px-4 lg:py-0.5 shadow-sm border-b border-gray-200">
        <div className="container mx-auto">
          <div className="flex items-center justify-between text-blue-gray-900">
            <Typography as="a" href="/" variant="h6" className="mr-4 cursor-pointer py-1.5 lg:ml-2">
              HotelBK
            </Typography>
            <div className="hidden lg:block">
              <NavList />
            </div>
            <div className="hidden gap-2 lg:flex">
              <div className="flex items-center">
                <Menu>
                  <MenuHandler>
                    <IconButton variant="text" color="blue-gray">
                      <BellIcon className="h-5 w-5 text-gray-900" />
                    </IconButton>
                  </MenuHandler>
                  <MenuList className="w-max border-0">
                    <MenuItem className="flex items-center gap-4">
                      <Avatar
                        src="https://demos.creative-tim.com/material-dashboard/assets/img/small-logos/logo-spotify.svg"
                        alt="item-1"
                        size="sm"
                        variant="circular"
                      />
                      <div>
                        <Typography variant="small" color="blue-gray" className="mb-1 font-normal">
                          <strong>New album</strong> by Travis Scott
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="flex items-center gap-1 text-xs font-normal opacity-60"
                        >
                          <ClockIcon className="h-3.5 w-3.5" /> 1 day ago
                        </Typography>
                      </div>
                    </MenuItem>
                    <MenuItem className="flex items-center gap-4">
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-blue-gray-800 to-blue-gray-900">
                        <CreditCardIcon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <Typography variant="small" color="blue-gray" className="mb-1 font-normal">
                          Payment successfully completed
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="flex items-center gap-1 text-xs font-normal opacity-60"
                        >
                          <ClockIcon className="h-3.5 w-3.5" /> 2 days ago
                        </Typography>
                      </div>
                    </MenuItem>
                  </MenuList>
                </Menu>
                {isLoggedIn ? (
                  <ProfileMenu />
                ) : (
                  <Link to="/login">
                    <Button
                      variant="text"
                      color="gray"
                      className="hidden items-center gap-1 px-4 xl:flex normal-case text-gray-900"
                    >
                      <UserCircleIcon className="h-5 w-5 text-gray-900" />
                      Đăng nhập
                    </Button>
                    <IconButton variant="text" color="blue-gray" className="grid xl:hidden">
                      <UserCircleIcon className="h-5 w-5 text-gray-900" />
                    </IconButton>
                  </Link>
                )}
              </div>
            </div>
            <IconButton
              variant="text"
              color="blue-gray"
              className="lg:hidden"
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <XMarkIcon className="h-6 w-6" strokeWidth={2} />
              ) : (
                <Bars3Icon className="h-6 w-6" strokeWidth={2} />
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          <NavList />
          <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
            <div className="flex items-center">
              <div className="mr-auto md:mr-4 md:w-56">
                <Input label="Search" />
              </div>
              <Menu>
                <MenuHandler>
                  <IconButton variant="text" color="blue-gray">
                    <BellIcon className="h-5 w-5 text-gray-900" />
                  </IconButton>
                </MenuHandler>
                <MenuList className="w-max border-0">
                  <MenuItem className="flex items-center gap-3">
                    <Avatar
                      src="https://demos.creative-tim.com/material-dashboard/assets/img/team-2.jpg"
                      alt="item-1"
                      size="sm"
                      variant="circular"
                    />
                    <div>
                      <Typography variant="small" color="blue-gray" className="mb-1 font-normal">
                        <strong>New message</strong> from Laur
                      </Typography>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex items-center gap-1 text-xs font-normal opacity-60"
                      >
                        <ClockIcon className="h-3.5 w-3.5" /> 13 minutes ago
                      </Typography>
                    </div>
                  </MenuItem>
                  <MenuItem className="flex items-center gap-4">
                    <Avatar
                      src="https://demos.creative-tim.com/material-dashboard/assets/img/small-logos/logo-spotify.svg"
                      alt="item-1"
                      size="sm"
                      variant="circular"
                    />
                    <div>
                      <Typography variant="small" color="blue-gray" className="mb-1 font-normal">
                        <strong>New album</strong> by Travis Scott
                      </Typography>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex items-center gap-1 text-xs font-normal opacity-60"
                      >
                        <ClockIcon className="h-3.5 w-3.5" /> 1 day ago
                      </Typography>
                    </div>
                  </MenuItem>
                  <MenuItem className="flex items-center gap-4">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-blue-gray-800 to-blue-gray-900">
                      <CreditCardIcon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <Typography variant="small" color="blue-gray" className="mb-1 font-normal">
                        Payment successfully completed
                      </Typography>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex items-center gap-1 text-xs font-normal opacity-60"
                      >
                        <ClockIcon className="h-3.5 w-3.5" /> 2 days ago
                      </Typography>
                    </div>
                  </MenuItem>
                </MenuList>
              </Menu>
              <Link to="/login">
                <Button
                  variant="text"
                  color="blue-gray"
                  className="hidden items-center gap-1 px-4 xl:flex normal-case"
                >
                  <UserCircleIcon className="h-5 w-5 text-gray-900" />
                  Đăng nhập
                </Button>
                <IconButton variant="text" color="blue-gray" className="grid xl:hidden">
                  <UserCircleIcon className="h-5 w-5 text-gray-900" />
                </IconButton>
              </Link>
            </div>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
}
