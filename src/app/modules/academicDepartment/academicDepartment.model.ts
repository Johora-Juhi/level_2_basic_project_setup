import { Schema, model } from "mongoose";
import { TACademicDepartment } from "./academicDepartment.interface";
import AppError from "../../error/AppError";
import httpStatus from "http-status";

const AcademicDepartmentSchema = new Schema<TACademicDepartment>(
  {
    name: { type: String, required: true, unique: true },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "AcademicFaculty",
    },
  },
  {
    timestamps: true,
  }
);

// AcademicDepartmentSchema.pre("save", async function (next) {
//   const isDepartmentExists = await AcademicDepartment.findOne({
//     name: this.name,
//   });

//   if (isDepartmentExists) {
//     throw new Error("This department already exists!");
//   }

//   next();
// });

AcademicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();

  const isDepartmentExists = await AcademicDepartment.findOne(query);

  if (!isDepartmentExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This department does not exists!!"
    );
  }

  next();
});

export const AcademicDepartment = model<TACademicDepartment>(
  "AcademicDepartment",
  AcademicDepartmentSchema
);
