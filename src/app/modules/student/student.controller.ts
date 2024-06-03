import { StudentServices } from "./student.services";
import SendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../middleware/catchAsync";

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB(req.query);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Student data retrieved successfully",
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(id);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student data retrieved successfully",
    data: result,
  });
});
const updateSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { student } = req.body;
  const result = await StudentServices.updateSingleStudentIntoDB(
    id,
    student
  );

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student data updated successfully",
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentServices.deleteStudentFromDB(id);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student data deleted successfully",
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  updateSingleStudent,
  deleteStudent,
};
