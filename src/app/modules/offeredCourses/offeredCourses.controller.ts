import httpStatus from "http-status";
import catchAsync from "../../middleware/catchAsync";
import SendResponse from "../../utils/sendResponse";
import { offeredCoursesServices } from "./offeredCourses.services";

const createOfferedCourses = catchAsync(async (req, res) => {
  const result = await offeredCoursesServices.createOfferedCoursesIntoDB(
    req.body
  );

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Offered courses created succesfully",
    data: result,
  });
});

export const offeredCoursesControllers = {
  createOfferedCourses,
};
