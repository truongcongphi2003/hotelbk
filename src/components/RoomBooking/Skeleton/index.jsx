import { Typography, Card, CardHeader, CardBody, Button } from '@material-tailwind/react';

export function RoomSkeleton() {
  return (
    <>
      <Card className="border p-4  mt-3 animate-pulse">
        <Typography as="div" variant="h1" className="mb-4 h-3 w-56 rounded-full bg-gray-300">
          &nbsp;
        </Typography>
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 ">
          <div className="flex flex-col col-span-1">
            <div className="rounded-xl flex justify-center items-center w-full h-[205px] lg:h-[268px] bg-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-12 w-12 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </div>
            <div className="flex flex-col mt-4">
              <Typography as="div" variant="h1" className="mb-4 h-3 w-56 rounded-full bg-gray-300">
                &nbsp;
              </Typography>
              <Typography as="div" variant="h1" className="mb-4 h-3 w-56 rounded-full bg-gray-300">
                &nbsp;
              </Typography>
            </div>
          </div>
          <div className="col-span-2 flex flex-col gap-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="shadow-sm border px-4 py-6">
                <div className="grid grid-cols-4 mb-6">
                  <div className="col-span-3">
                    <div className="grid grid-cols-4 gap-3">
                      <Typography
                        as="div"
                        variant="h1"
                        className="mb-4 h-3 rounded-full bg-gray-300 col-span-2"
                      >
                        &nbsp;
                      </Typography>
                      <Typography
                        as="div"
                        variant="h1"
                        className="mb-4 h-3 rounded-full bg-gray-300"
                      >
                        &nbsp;
                      </Typography>
                      <Typography
                        as="div"
                        variant="h1"
                        className="mb-4 h-3 rounded-full bg-gray-300"
                      >
                        &nbsp;
                      </Typography>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      <Typography
                        as="div"
                        variant="h1"
                        className="mb-4 h-3 rounded-full bg-gray-300 col-span-2"
                      >
                        &nbsp;
                      </Typography>
                      <Typography
                        as="div"
                        variant="h1"
                        className="mb-4 h-3 rounded-full bg-gray-300"
                      >
                        &nbsp;
                      </Typography>
                      <Typography
                        as="div"
                        variant="h1"
                        className="mb-4 h-3 rounded-full bg-gray-300"
                      >
                        &nbsp;
                      </Typography>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      <Typography
                        as="div"
                        variant="h1"
                        className="mb-4 h-3 rounded-full bg-gray-300 col-span-2"
                      >
                        &nbsp;
                      </Typography>
                      <Typography
                        as="div"
                        variant="h1"
                        className="mb-4 h-3 rounded-full bg-gray-300"
                      >
                        &nbsp;
                      </Typography>
                      <Typography
                        as="div"
                        variant="h1"
                        className="mb-4 h-3 rounded-full bg-gray-300"
                      >
                        &nbsp;
                      </Typography>
                    </div>
                  </div>
                  <div className="flex w-full h-full items-center justify-center">
                    <Button className="w-32 h-8 col-span-1 bg-gray-300"> &nbsp;</Button>
                  </div>
                </div>
                <Typography
                  as="div"
                  variant="h1"
                  className="mb-4 h-3 w-full rounded-full bg-gray-300"
                >
                  &nbsp;
                </Typography>
                <Typography as="div" variant="h1" className="h-3 w-full rounded-full bg-gray-300">
                  &nbsp;
                </Typography>
              </Card>
            ))}
          </div>
        </div>
      </Card>
    </>
  );
}
