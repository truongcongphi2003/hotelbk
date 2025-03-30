import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from '@material-tailwind/react';
import { Link } from 'react-router-dom';
export function HotelCard({ hotel = {} }) {
  const { id, name, location, thumbnail, reviewRating, reviewCount, price, discount } = hotel;
  const detailUrl = `/hotel/${id}`;
  return (
    <Link to={detailUrl}>
      <Card className="w-full h-full max-w-[20rem] shadow-lg">
        <CardHeader
          floated={false}
          color="blue-gray"
          className="m-0 min-h-[210px] h-[210px] rounded-b-none rounded-t-2xl"
        >
          <img src={thumbnail} alt={name} className=" w-full object-cover object-center" />
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
          <Typography className="!absolute top-0 left-0 font-medium bg-light-blue-900 px-3 py-1 rounded-s-none rounded-b-xl">
            <i className="fa-solid fa-location-dot pe-1" />
            {location}
          </Typography>
          <IconButton
            variant="text"
            color="red"
            size="sm"
            className="!absolute top-4 right-4 rounded-full bg-opacity-75 bg-white hover:opacity-100 hover:bg-white active:bg-white shadow-lg"
          >
            {/* <i className="fa-regular fa-heart text-xl" /> */}
            <i className="fas fa-heart text-xl" />
          </IconButton>
        </CardHeader>
        <CardBody className="relative flex flex-col justify-between h-full rounded-2xl mt-[-16px] z-10 bg-white">
          <Typography
            color="blue-gray"
            className="flex flex-nowrap items-center gap-1.5 bg-white text-sm font-normal shadow-sm border rounded-full w-fit px-2 py-1 !absolute top-[-12px] right-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="-mt-0.5 h-5 w-5 text-yellow-700"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            {reviewRating}
            <span className="text-blue-gray-800 whitespace-nowrap font-light">
              ({reviewCount} đánh giá)
            </span>
          </Typography>
          <Typography variant="h5" color="blue-gray" className="font-medium">
            {name}.
          </Typography>

          <div className="pt-5 pt-auto">
            <Typography color="gray" className="text-gray-700 line-through text-sm  font-medium">
              {price?.toLocaleString()} VND
            </Typography>
            <div className="flex items-center">
              <Typography
                color="gray"
                className="text-blue-gray-900 text-lg font-semibold whitespace-nowrap"
              >
                {discount?.toLocaleString()} VND
              </Typography>
              <Typography color="blue-gray" className="font-light whitespace-nowrap">
                /đêm
              </Typography>
            </div>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}
