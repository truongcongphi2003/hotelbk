import React from 'react';
import { Carousel, IconButton } from '@material-tailwind/react';
import { Card, CardHeader, CardBody, Typography, Avatar } from '@material-tailwind/react';
import { Tooltip, Button } from '@material-tailwind/react';

function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5 text-yellow-700"
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const FeedbackCarousel = ({ config }) => {
  return (
    <div>
      <Carousel
        className="rounded-xl"
        loop={true}
        autoplay={true}
        //   Nút back
        prevArrow={({ handlePrev }) => (
          <IconButton
            variant="text"
            color="black"
            size="lg"
            onClick={handlePrev}
            className="!absolute top-2/4 left-4 -translate-y-2/4 bg-blue-gray-50 opacity-50 hover:opacity-100 transition-opacity"
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
        //   nút next
        nextArrow={({ handleNext }) => (
          <IconButton
            variant="text"
            color="black"
            size="lg"
            onClick={handleNext}
            className="!absolute top-2/4 !right-4 -translate-y-2/4 bg-blue-gray-50 opacity-50 hover:opacity-100 transition-opacity"
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
        {/* Comment1 */}
        <div className="flex justify-center items-center">
          <Card color="transparent" shadow={false} className="w-full max-w-[26rem]">
            <CardHeader
              color="transparent"
              floated={false}
              shadow={false}
              className="mx-0 flex items-center gap-4 pt-0 pb-8"
            >
              <Tooltip
                content="Bùi Hải Nam"
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 },
                }}
              >
                <Avatar
                  size="lg"
                  variant="circular"
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                  alt="tania andrew"
                />
              </Tooltip>

              <div className="flex w-full flex-col gap-0.5">
                <div className="flex items-center justify-between">
                  <Typography variant="h5" color="blue-gray">
                    Hải Nam
                  </Typography>
                  <div className="5 flex items-center gap-0">
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                  </div>
                </div>
                <Typography color="blue-gray">2 tháng trước</Typography>
              </div>
            </CardHeader>
            <CardBody className="mb-6 p-0">
              <Typography>
                &quot; Phòng VIP của khách sạn mang đến trải nghiệm nghỉ dưỡng tuyệt vời với không
                gian sang trọng, hiện đại và đầy đủ tiện nghi. Từ nội thất cao cấp đến dịch vụ chăm
                sóc khách hàng tận tâm, mọi chi tiết đều được chú trọng để mang lại sự thoải mái và
                riêng tư tối đa cho khách !!!&quot;
              </Typography>
            </CardBody>
          </Card>
        </div>

        {/* Comment 2 */}
        <div className="flex justify-center items-center">
          <Card color="transparent" shadow={false} className="w-full max-w-[26rem]">
            <CardHeader
              color="transparent"
              floated={false}
              shadow={false}
              className="mx-0 flex items-center gap-4 pt-0 pb-8"
            >
              <Tooltip
                content="Bùi Hải Nam"
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 },
                }}
              >
                <Avatar
                  size="lg"
                  variant="circular"
                  src="https://i.pinimg.com/236x/77/d0/46/77d046216aed031dae02543b9ee2ac79.jpg"
                  alt="tania andrew"
                />
              </Tooltip>
              <div className="flex w-full flex-col gap-0.5">
                <div className="flex items-center justify-between">
                  <Typography variant="h5" color="blue-gray">
                    Công Phi
                  </Typography>
                  <div className="5 flex items-center gap-0">
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                  </div>
                </div>
                <Typography color="blue-gray">3 tháng trước</Typography>
              </div>
            </CardHeader>
            <CardBody className="mb-6 p-0">
              <Typography>
                &quot;Thực sự rất tốt, dịch vụ, giá cả, mọi thứ đều rất oke, phù hợp với các gia
                đình cần nghỉ ngơi sau những ngày tháng làm việc. Tôi sẽ quay lại !!!&quot;
              </Typography>
            </CardBody>
          </Card>
        </div>

        {/* Commnet 3 */}
        <div className="flex justify-center items-center">
          <Card color="transparent" shadow={false} className="w-full max-w-[26rem]">
            <CardHeader
              color="transparent"
              floated={false}
              shadow={false}
              className="mx-0 flex items-center gap-4 pt-0 pb-8"
            >
              <Tooltip
                content="Bùi Hải Nam"
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 },
                }}
              >
                <Avatar
                  size="lg"
                  variant="circular"
                  src="https://i.pinimg.com/236x/01/6e/3c/016e3c8be63c9f4d964fe2175e977fdb.jpg"
                  alt="tania andrew"
                />
              </Tooltip>
              <div className="flex w-full flex-col gap-0.5">
                <div className="flex items-center justify-between">
                  <Typography variant="h5" color="blue-gray">
                    Hồng Nhung
                  </Typography>
                  <div className="5 flex items-center gap-0">
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                  </div>
                </div>
                <Typography color="blue-gray">5 tháng trước</Typography>
              </div>
            </CardHeader>
            <CardBody className="mb-6 p-0">
              <Typography>
                &quot;Phòng khách sạn khá ổn, không quá sang trọng nhưng cũng đủ để mình cảm thấy
                thoải mái. Nội thất khá đơn giản nhưng sạch sẽ, giường ngủ êm ái, tắm rửa thoải mái.
                Có đủ tiện nghi cơ bản như tivi, máy lạnh, tủ lạnh mini. Nhân viên thì thân thiện và
                nhiệt tình. Tuy không có gì quá đặc biệt nhưng đối với một kỳ nghỉ ngắn ngày thì
                cũng là một lựa chọn hợp lý. !!!&quot;
              </Typography>
            </CardBody>
          </Card>
        </div>
      </Carousel>
    </div>
  );
};
export default FeedbackCarousel;
