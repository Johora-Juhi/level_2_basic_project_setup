import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchableFields } from "./course.constants";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate("preRequisiteCourses.course"),
    query
  )
    .search(courseSearchableFields)
    .filter()
    .paginate()
    .sort()
    .fields();

  const result = courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = Course.findById(id);
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...remainingCourseData } = payload;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const updateCourse = await Course.findByIdAndUpdate(
      id,
      remainingCourseData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updateCourse) {
      throw new Error("Error updating remaining Course Data");
    }

    if (preRequisiteCourses && preRequisiteCourses?.length > 0) {
      // filter delete prerequisite courses
      const deletePreRequisites = preRequisiteCourses
        ?.filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      const deletePreRequisiteCourses = await Course.findByIdAndUpdate(id, {
        $pull: {
          preRequisiteCourses: { course: { $in: deletePreRequisites } },
        },
      });

      if (!deletePreRequisiteCourses) {
        throw new Error("Error deleting preRequisite Course Data");
      }

      // filter new prerequisite courses
      const newPreRequisites = preRequisiteCourses?.filter(
        (el) => el.course && !el.isDeleted
      );

      const newPreRequisiteCourses = await Course.findByIdAndUpdate(id, {
        $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
      });
    }

    if (!newPreRequisiteCourses) {
      throw new Error("Error inserting new preRequisite Course Data");
    }

    const result = await Course.findById(id).populate(
      "preRequisiteCourses.course"
    );
    return result;

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();

    throw new Error();
  }
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );

  return result;
};

export const courseServices = {
  createCourseIntoDB,
  getCoursesFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
};
