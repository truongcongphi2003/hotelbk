import { Card, CardBody, Chip, Typography } from '@material-tailwind/react';
import React from 'react';

export function HighlightFeedback() {
  return (
    <>
      <Card className="flex flex-col gap-4 border shadow-none p-4 text-black">
        <div className="flex gap-4">
          <div className="border-2 border-light-blue-700 rounded-lg w-14 h-14 min-w-[3.5rem] text-light-blue-700 font-bold text-2xl flex items-center justify-center">
            8.5
          </div>
          <div className="flex flex-col">
            <Typography className="font-semibold text-xl text-nowrap">Ấn tượng</Typography>
            <Typography className="font-medium text-sm text-light-blue-700">
              105 đánh giá
            </Typography>
          </div>
        </div>
        <Typography className="font-medium text-md">Khách nói gì về kỳ nghỉ của họ</Typography>
        <div className="h-64 w-full flex flex-col gap-2 overflow-y-scroll">
          <Card className=" shadow-none border">
            <CardBody className="p-3">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="font-medium text-sm text-black">Trương C.P</div>
                  <div className="bg-blue-50 rounded-md py-0 px-4 font-medium text-sm text-light-blue-700">
                    8.2 / 10
                  </div>
                </div>
                <Typography className="font-normal text-sm text-gray-900">
                  Rất tuyệt. Giá cả hợp lý, còn ở trung tâm thành phố. Thật sự rất may vì book được
                  một chiếc phòng ở đây, còn có cả view Bitexco..đã 10 điểm 10
                </Typography>
              </div>
            </CardBody>
          </Card>
          <Card className=" shadow-none border">
            <CardBody className="p-3">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="font-medium text-sm text-black">Trương C.P</div>
                  <div className="bg-blue-50 rounded-md py-0 px-4 font-medium text-sm text-light-blue-700">
                    8.2 / 10
                  </div>
                </div>
                <Typography className="font-normal text-gray-900">
                  Rất tuyệt. Giá cả hợp lý, còn ở trung tâm thành phố. Thật sự rất may vì book được
                  một chiếc phòng ở đây, còn có cả view Bitexco..đã 10 điểm 10
                </Typography>
              </div>
            </CardBody>
          </Card>
          <Card className=" shadow-none border">
            <CardBody className="p-3">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="font-medium text-sm text-black">Trương C.P</div>
                  <div className="bg-blue-50 rounded-md py-0 px-4 font-medium text-sm text-light-blue-700">
                    8.2 / 10
                  </div>
                </div>
                <Typography className="font-normal text-gray-900">
                  Rất tuyệt. Giá cả hợp lý, còn ở trung tâm thành phố. Thật sự rất may vì book được
                  một chiếc phòng ở đây, còn có cả view Bitexco..đã 10 điểm 10
                </Typography>
              </div>
            </CardBody>
          </Card>
          <Card className=" shadow-none border">
            <CardBody className="p-3">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="font-medium text-sm text-black">Trương C.P</div>
                  <div className="bg-blue-50 rounded-md py-0 px-4 font-medium text-sm text-light-blue-700">
                    8.2 / 10
                  </div>
                </div>
                <Typography className="font-normal text-gray-900">
                  Rất tuyệt. Giá cả hợp lý, còn ở trung tâm thành phố. Thật sự rất may vì book được
                  một chiếc phòng ở đây, còn có cả view Bitexco..đã 10 điểm 10
                </Typography>
              </div>
            </CardBody>
          </Card>
          <Card className=" shadow-none border">
            <CardBody className="p-3">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="font-medium text-sm text-black">Trương C.P</div>
                  <div className="bg-blue-50 rounded-md py-0 px-4 font-medium text-sm text-light-blue-700">
                    8.2 / 10
                  </div>
                </div>
                <Typography className="font-normal text-gray-900">
                  Rất tuyệt. Giá cả hợp lý, còn ở trung tâm thành phố. Thật sự rất may vì book được
                  một chiếc phòng ở đây, còn có cả view Bitexco..đã 10 điểm 10
                </Typography>
              </div>
            </CardBody>
          </Card>
        </div>
      </Card>
    </>
  );
}
