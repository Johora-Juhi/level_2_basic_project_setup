import { TOfferedCourses } from "./offeredCourses.interface";
import { OfferedCourse } from "./offeredCourses.model";

const createOfferedCoursesIntoDB = async (payload: TOfferedCourses) => {
  const result = await OfferedCourse.create(payload);
  return result;
};

export const offeredCoursesServices = {
  createOfferedCoursesIntoDB,
};
