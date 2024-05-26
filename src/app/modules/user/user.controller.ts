import { UserServices } from "./user.services";
import SendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../middleware/catchAsync";

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  // validate using joi
  // const { error, value } = studentValidationSchema.validate(studentData);

  // if (error) {
  //   res.status(500).json({
  //     success: false,
  //     message: "Something went wrongllll",
  //     error: error.details,
  //   });
  // }

  // validation using zod
  // const value = studentValidationSchema.parse(studentData);
  const result = await UserServices.createStudentIntoDB(password, studentData);

  SendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is created successfully",
    data: result,
  });
});

export const UserController = {
  createStudent,
};
