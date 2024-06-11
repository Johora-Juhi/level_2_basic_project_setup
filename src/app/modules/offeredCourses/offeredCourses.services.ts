import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { TOfferedCourses } from "./offeredCourses.interface";
import { OfferedCourse } from "./offeredCourses.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { Course } from "../course/course.model";
import { Faculty } from "../faculty/faculty.model";

const createOfferedCoursesIntoDB = async (payload: TOfferedCourses) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    section,
    faculty,
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

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

export const offeredCoursesServices = {
  createOfferedCoursesIntoDB,
};
