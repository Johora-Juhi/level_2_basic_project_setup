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

const updateAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result = await academicSemesterServices.updateAcademicSemesterIntoDB(
    semesterId,
    req.body
  );

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic semester created successfully",
    data: result,
  });
});

const getAllAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.getAllAcademicSemesterFromDB();

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Academic semester retrived successfully",
    data: result,
  });
});

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;

  const result =
    await academicSemesterServices.getSingleAcademicSemesterFromDB(semesterId);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic semester retrived successfully",
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
  updateAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
};
