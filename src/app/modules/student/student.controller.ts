import { StudentServices } from "./student.services";
import SendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../middleware/catchAsync";

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB();

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Student data retrieved successfully",
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student data retrieved successfully",
    data: result,
  });
});
const updateSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;
  const result = await StudentServices.updateSingleStudentIntoDB(
    studentId,
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
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDB(studentId);

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
