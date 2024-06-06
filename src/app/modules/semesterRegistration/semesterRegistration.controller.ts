import httpStatus from "http-status";
import catchAsync from "../../middleware/catchAsync";
import SendResponse from "../../utils/sendResponse";
import { semesterRegistrationServices } from "./semesterRegistration.services";

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await semesterRegistrationServices.createSemesterRegistrationIntoDB(
      req.body
    );

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Semester registered succesfully",
    data: result,
  });
});

export const semesterRegistrationController = {
  createSemesterRegistration,
};
