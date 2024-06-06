import { Schema, model } from "mongoose";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { semesterRegistrationStatus } from "./semesterRegistration.constants";

const semesterRegistrationSchema = new Schema<TSemesterRegistration>({
  academicSemester: {
    type: Schema.Types.ObjectId,
    ref: "AcademicSemester",
    unique: true,
    required: true,
  },
  status: {
    type: String,
    enum: semesterRegistrationStatus,
    default: "Upcoming",
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  minCredit: { type: Number, required: true },
  maxCredit: { type: Number, required: true },
});

export const SemesterRegistration = model<TSemesterRegistration>(
  "SemesterRegistration",
  semesterRegistrationSchema
);
