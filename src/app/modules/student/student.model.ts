import { Schema, model, connect } from "mongoose";
import {
  // StudentMethods,
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from "./student.interface";
import validator from "validator";
import bcrypt from "bcrypt";
import config from "../../config";

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, "Firstname is required"],
    maxlength: [20, "FirstName can not be more then 20 charecter"],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: "{VALUE} is not in capitalize format",
    },
  },
  middleName: String,
  lastName: {
    type: String,
    trim: true,
    required: [true, "Lastname is required"],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: "{VALUE} is not valid",
    },
  },
});

const gurdianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const localGurdianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
  relation: { type: String, required: true },
});

// const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({
const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    unique: true,
    minlength: [8, "Password can not be less then 8 character"],
  },
  name: {
    type: userNameSchema,
    required: [true, "Student Name is required"],
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female"],
      message: "The gender field must be male or female",
    },
    required: true,
  }, //enum type not array
  dateOfBirth: { type: String, required: [true, "Date of birth is required"] },
  contactNo: { type: String, required: [true, "Contact no is required"] },
  emergencyContactNo: {
    type: String,
    required: [true, "Emergency contact no is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: "{VALUE} is not a valid email",
    },
  },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  presentAddress: {
    type: String,
    required: [true, "Present Address is required"],
  },
  permanentAddress: {
    type: String,
    required: [true, "Permanent Address is required"],
  },
  guardian: {
    type: gurdianSchema,
    required: [true, "Gurdian information is required"],
  },
  localGuardian: {
    type: localGurdianSchema,
    required: [true, "Local Gurdian information is required"],
  },
  profileImage: String,
  isActive: {
    type: String,
    enum: {
      values: ["active", "blocked"],
      message: " Student can either be active or blocked",
    },
    required: [true, "Student status is required"],
  },
});

// for creatin custom static method
studentSchema.statics.isStudentExists = async function (id: string) {
  const isStudentExists = await Student.findOne({ id });
  return isStudentExists;
};

// pre save middleware/ hook : will work on create() and save()
studentSchema.pre("save", async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
});
// for creatin instance
// studentSchema.methods.isStudentExists = async function (id: string) {
//   const isStudentExists = await Student.findOne({ id });
//   return isStudentExists;
// };

export const Student = model<TStudent, StudentModel>("Student", studentSchema);
