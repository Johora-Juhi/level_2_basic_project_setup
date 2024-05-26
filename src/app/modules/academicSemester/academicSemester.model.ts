import { Schema, model } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from "./academicSemester.constants";

const AcademicSemesterSchema = new Schema<TAcademicSemester>({
  name: { type: String, enum: AcademicSemesterName, required: true },
  code: { type: String, enum: AcademicSemesterCode, required: true },
  year: { type: Date, required: true },
  startMonth: { type: String, enum: Months, required: true },
  endMonth: { type: String, enum: Months, required: true },
});

export const AcademicSemester = model<TAcademicSemester>(
  "AcademicSemester",
  AcademicSemesterSchema
);
