import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.services";

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData
    );

    res.status(200).json({
      success: true,
      message: "Student is created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  createStudent,
};
