import httpStatus from "http-status";
import catchAsync from "../../middleware/catchAsync";
import SendResponse from "../../utils/sendResponse";
import { courseServices } from "./course.services";

const createCourse = catchAsync(async (req, res) => {
  const result = await courseServices.createCourseIntoDB(req.body);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "COurse created succefully",
    data: result,
  });
});

const getAllCourse = catchAsync(async (req, res) => {
  const result = await courseServices.getCoursesFromDB();

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Course retrived successfully",
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await courseServices.getSingleCourseFromDB(id);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course retrived successfully",
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await courseServices.deleteCourseFromDB(id);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course deleted successfully",
    data: result,
  });
});

export const courseControllers = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  deleteCourse,
};
