import { Schema, model } from "mongoose";
import {
  TCourse,
  TCourseFaculties,
  TPrerequisiteCourses,
} from "./course.interface";

const preRequisiteCoursesSchema = new Schema<TPrerequisiteCourses>({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  isDeleted: { type: Boolean, default: false },
});

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  prefix: {
    type: String,
    trim: true,
    required: true,
  },
  code: {
    type: Number,
    trim: true,
    required: true,
  },
  credits: {
    type: Number,
    trim: true,
    required: true,
  },
  isDeleted: { type: Boolean, default: false },
  preRequisiteCourses: [preRequisiteCoursesSchema],
});

export const Course = model<TCourse>("Course", courseSchema);

const courseFacultiesSchema = new Schema<TCourseFaculties>({
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  faculties: {
    type: [Schema.Types.ObjectId],
    ref: "Faculty",
  },
});

export const CourseFaculties = model<TCourseFaculties>(
  "CourseFaculties",
  courseFacultiesSchema
);
