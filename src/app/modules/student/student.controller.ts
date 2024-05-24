import { NextFunction, Request, Response } from "express";
import { StudentServices } from "./student.services";
import SendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    SendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "All Student data retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    SendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student data retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);

    SendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student data retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
