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

const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await semesterRegistrationServices.getAllSemesterRegistrationFromDB(
      req.query
    );

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Registered semester retrived succesfully",
    data: result,
  });
});

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await semesterRegistrationServices.getsingleSemesterRegistrationFromDB(id);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Registered semester is retrived succesfully",
    data: result,
  });
});

const updateSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await semesterRegistrationServices.updateSemesterRegistrationIntoDB(
      id,
      req.body
    );

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Registered semester is updated succesfully",
    data: result,
  });
});

export const semesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};
