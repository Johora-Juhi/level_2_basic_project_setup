import { Schema, model } from "mongoose";
import { TACademicFaculty } from "./academicFaculty.interface";

const AcademicFacultySchema = new Schema<TACademicFaculty>(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

export const AcademicFaculty = model<TACademicFaculty>(
  "AcademicFaculty",
  AcademicFacultySchema
);
