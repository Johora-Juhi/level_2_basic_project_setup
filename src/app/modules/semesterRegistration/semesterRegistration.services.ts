import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";
import QueryBuilder from "../../builder/QueryBuilder";

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

  // check if there is any ongoing or upcoming semester

  const ongoingOrUpcomingSemester = await SemesterRegistration.findOne({
    $or: [
      {
        status: "Upcoming",
      },
      {
        status: "Ongoing",
      },
    ],
  });

  if (ongoingOrUpcomingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already an ${ongoingOrUpcomingSemester.status} semester`
    );
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>
) => {
  const getAllSemesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate("academicSemester"),
    query
  )
    .filter()
    .paginate()
    .sort()
    .fields();

  const result = getAllSemesterRegistrationQuery.modelQuery;
  return result;
};

const getsingleSemesterRegistrationFromDB = async (id: string) => {
  const result =
    await SemesterRegistration.findById(id).populate("academicSemester");
  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>
) => {
  const registeredSemester = await SemesterRegistration.findById(id);

  if (!registeredSemester) {
    throw new AppError(httpStatus.NOT_FOUND, "This semester is not registered");
  }

  const registeredSemesterStatus = registeredSemester?.status;

  if (registeredSemesterStatus === "Ended") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester already ${registeredSemesterStatus}`
    );
  }

  return payload;
};

export const semesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getsingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
