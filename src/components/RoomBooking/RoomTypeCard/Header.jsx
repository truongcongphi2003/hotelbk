import React from 'react';
import { Carousel, IconButton, Typography } from '@material-tailwind/react';
import { WifiIcon } from '@heroicons/react/24/outline';

const Header = ({ item }) => {
  return (
    <>
      <Carousel
        className="rounded-xl w-full h-[205px] lg:h-[268px]"
        prevArrow={({ handlePrev }) => (
          <IconButton
            variant="text"
            color="white"
            size="lg"
            onClick={handlePrev}
            className="!absolute top-2/4 left-4 -translate-y-2/4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </IconButton>
        )}
        nextArrow={({ handleNext }) => (
          <IconButton
            variant="text"
            color="white"
            size="lg"
            onClick={handleNext}
            className="!absolute top-2/4 !right-4 -translate-y-2/4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </IconButton>
        )}
      >
        <img
          src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
          alt="image 3"
          className="h-full w-full object-cover"
        />
      </Carousel>
      <div className="flex flex-col">
        <div className="flex items-center gap-2 mt-4">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-id="IcHotelRoomMeasure"
          >
            <path
              d="M12 21H7L21 7V21H18M12 21V20M12 21H15M15 21V20M15 21H18M18 21V20M15 17H17V15"
              stroke="#0194F3"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M8 8L9 9M8 8L5 11M8 8L11 5M5 11L6 12M5 11L2 14L5 17L17 5L14 2L11 5M11 5L12 6"
              stroke="#03121A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <Typography className="font-medium text-sm">{item.size} m²</Typography>
        </div>
        {item.isNoSmoking ? (
          <div className="flex items-center gap-2 mt-4">
            <svg
              width="24"
              height="24"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              data-id="IcHotelRoomNoSmokingArea16"
            >
              <g clipPath="url(#clip0_10944_6443)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.77925 10H2C1.44772 10 1 10.4477 1 11V12.8363L3.77925 10ZM3.08001 15H11H13C14.1046 15 15 14.1046 15 13V12C15 10.8954 14.1046 10 13 10H11H7.97945L6.01967 12H10V13H5.03978L3.08001 15ZM12 13V12H13V13H12Z"
                  fill="#687176"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.5504 2.06932C11.0985 1.42284 10.3486 1 9.5 1H8C7.44772 1 7 1.44772 7 2C7 2.55228 7.44772 3 8 3H9.5C9.77614 3 10 3.22386 10 3.5C10 3.54942 10.0014 3.59851 10.0043 3.64722L11.5504 2.06932ZM13.6064 4.25754L11.957 5.94086C12.1318 5.97958 12.3135 6 12.5 6C12.7761 6 13 6.22386 13 6.5V8.5C13 9.05228 13.4477 9.5 14 9.5C14.5523 9.5 15 9.05228 15 8.5V6.5C15 5.51654 14.4321 4.66572 13.6064 4.25754ZM7.89932 5.79537C7.59509 4.75774 6.63603 4 5.5 4H4C3.44772 4 3 3.55228 3 3V2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2V3C1 4.65685 2.34315 6 4 6H5.5C5.77614 6 6 6.22386 6 6.5C6 6.86127 6.07663 7.20464 6.21452 7.51475L7.89932 5.79537ZM8.95933 9L10.9191 7H11C11.5523 7 12 7.44772 12 8V8.5C12 9.05228 11.5523 9.5 11 9.5C10.6299 9.5 10.3067 9.2989 10.1338 9H8.95933Z"
                  fill="#0194f3"
                ></path>
                <path
                  d="M1.17932 14.7965L14.4989 1.20355"
                  stroke="#687176"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_10944_6443">
                  <rect width="16" height="16" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
            <Typography className="font-medium text-sm">Không hút thuốc</Typography>
          </div>
        ) : (
          <div className="flex items-center gap-2 mt-4">
            <i class="fa-solid fa-smoking"></i>
            <Typography className="font-medium text-sm">Được hút thuốc</Typography>
          </div>
        )}

        <div className="grid grid-cols-2 text-gray-600">
          <div className="flex items-center gap-1 mt-4">
            <WifiIcon className="h-5 w-5" />
            <Typography className="font-medium text-xs">WiFi</Typography>
          </div>
          <div className="flex items-center gap-1 mt-4">
            <WifiIcon className="h-5 w-5" />
            <Typography className="font-medium text-xs">WiFi</Typography>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
