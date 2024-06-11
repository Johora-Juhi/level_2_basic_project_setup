import { Types } from "mongoose";

export type TDay = "Sat" | "Sun" | "Mon" | "Tues" | "Wed" | "Thur" | "Fri";

export type TOfferedCourses = {
  semesterRegistration: Types.ObjectId;
  academicSemester?: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  course: Types.ObjectId;
  faculty: Types.ObjectId;
  maxCapacity: number;
  section: number;
  days: TDay[];
  startTime: string;
  endTime: string;
};

export type TSchedule = {
  days: TDay[];
  startTime: string;
  endTime: string;
};
