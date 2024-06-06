import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { academicSemesterNameCodeMapper } from "./academicSemester.constants";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  // check the name code coordination
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error("The semester code is incorrect!");
  }

  const result = AcademicSemester.create(payload);
  return result;
};
const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>
) => {
  // check the name code coordination
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error("The semester code is incorrect!");
  }

  const result = AcademicSemester.findByIdAndUpdate(id, payload, {
    new: true,
  });

  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `Academic semester with ID ${id} not found`
    );
  }

  return result;
};

const getAllAcademicSemesterFromDB = async () => {
  const result = await AcademicSemester.find({});
  return result;
};

const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};

export const academicSemesterServices = {
  createAcademicSemesterIntoDB,
  updateAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
};
