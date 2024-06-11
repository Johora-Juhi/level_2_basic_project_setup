import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourses } from "./offeredCourses.interface";
import { OfferedCourse } from "./offeredCourses.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";
import { hasTimeConflict } from "./offeredCourses.utils";

const createOfferedCoursesIntoDB = async (payload: TOfferedCourses) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    section,
    faculty,
    days,
    startTime,
    endTime,
  } = payload;

  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration);

  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Semester is not found!");
  }

  const academicSemester = isSemesterRegistrationExists.academicSemester;

  const isAcademicFacultyExists =
    await AcademicFaculty.findById(academicFaculty);

  if (!isAcademicFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Academic faculty is not found!");
  }

  const isAcademicDepartmentExists =
    await AcademicDepartment.findById(academicDepartment);

  if (!isAcademicDepartmentExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Academic department is not found!"
    );
  }

  const isCourseExists = await Course.findById(course);

  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Course is not found!");
  }

  const isFacultyExists = await Faculty.findById(faculty);

  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Faculty is not found!");
  }

  const isFacultyExistsInDepartment = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  });

  if (!isFacultyExistsInDepartment) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This ${isAcademicFacultyExists.name} does not belong to ${isAcademicDepartmentExists.name}`
    );
  }

  const isSameSectionWithSameCourseWithSameSemesterExists =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    });

  if (isSameSectionWithSameCourseWithSameSemesterExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This course with same section already exists!`
    );
  }

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select("days startTime endTime");

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `Faculty is not available at that slot! Chane the day or time..`
    );
  }

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

const updateOfferedCoursesIntoDB = async (
  id: string,
  payload: Pick<
    TOfferedCourses,
    "faculty" | "days" | "startTime" | "endTime" | "section" | "maxCapacity"
  >
) => {
  const { faculty, days, startTime, endTime } = payload;
  const isOfferedCourseExists = await OfferedCourse.findById(id);

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Offered course is not found!");
  }

  const semesterRegistration = isOfferedCourseExists.semesterRegistration;

  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration);

  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Semester is not found!");
  }

  if (isSemesterRegistrationExists.status !== "Upcoming") {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `You can not update this offered course as it is ${isSemesterRegistrationExists.status}`
    );
  }

  const isFacultyExists = await Faculty.findById(faculty);

  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Faculty is not found!");
  }

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select("days startTime endTime");

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `Faculty is not available at that slot! Chane the day or time..`
    );
  }

  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const offeredCoursesServices = {
  createOfferedCoursesIntoDB,
  updateOfferedCoursesIntoDB,
};
