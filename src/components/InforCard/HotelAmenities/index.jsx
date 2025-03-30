import { Typography } from '@material-tailwind/react';

export function HotelAmenities({ data, isLoading }) {
  const skeleton = (
    <div className="max-w-full animate-pulse">
      <Typography as="div" variant="h1" className="mb-4 h-3 w-56 rounded-full bg-gray-300">
        &nbsp;
      </Typography>
      <Typography as="div" variant="paragraph" className="mb-2 h-2 w-72 rounded-full bg-gray-300">
        &nbsp;
      </Typography>
      <Typography as="div" variant="paragraph" className="mb-2 h-2 w-72 rounded-full bg-gray-300">
        &nbsp;
      </Typography>
      <Typography as="div" variant="paragraph" className="mb-2 h-2 w-72 rounded-full bg-gray-300">
        &nbsp;
      </Typography>
      <Typography as="div" variant="paragraph" className="mb-2 h-2 w-72 rounded-full bg-gray-300">
        &nbsp;
      </Typography>
    </div>
  );
  return (
    <div className="py-8 px-3">
      <Typography variant="h5" className="py-4">
        Tất cả những tiện ích tại Khách sạn
      </Typography>
      {!isLoading ? (
        <div className="grid grid-cols-3 gap-4">
          {data?.pageItems?.map((item, index) => (
            <div key={index} className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-gray-900">
                <span className="" dangerouslySetInnerHTML={{ __html: item.icon }} />
                <Typography className="text-base font-semibold">{item.name}</Typography>
              </div>
              <ul className="ms-3 list-inside list-disc flex flex-col gap-2">
                {item.children?.map((subItem, subIndex) => (
                  <li key={subIndex}>{subItem.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        skeleton
      )}
    </div>
  );
}
