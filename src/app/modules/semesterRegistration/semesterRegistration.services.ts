import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration
) => {
  const academicSemester = payload?.academicSemester;

  // check if the semester exists

  const isSemesterExists = await AcademicSemester.findById(academicSemester);

  if (!isSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, "This semeseter does not exists");
  }

  // check if the semester is already registered

  const isSemesterRegistered = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterRegistered) {
    throw new AppError(
      httpStatus.CONFLICT,
      "This semester is already registered"
    );
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

export const semesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
};
