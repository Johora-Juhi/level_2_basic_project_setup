import catchAsync from "../../middleware/catchAsync";
import { academicSemesterServices } from "./academicSemester.services";
import SendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.createAcademicSemesterIntoDB(
    req.body
  );

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic semester created successfully",
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
};
