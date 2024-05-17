import { Schema, model, connect } from "mongoose";
import { Gurdian, LocalGurdian, Student, UserName } from "./student.interface";

const userNameSchema = new Schema<UserName>({
    firtName: { type: String, required: true },
    middlename: String,
    lastName: { type: String, required: true },
});

const gurdianSchema = new Schema<Gurdian>({
    fatherName: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    fatherContactNo: { type: String, required: true },
    motherName: { type: String, required: true },
    motherOccupation: { type: String, required: true },
    motherContactNo: { type: String, required: true },
});

const localGurdianSchema = new Schema<LocalGurdian>({
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    contactNo: { type: String, required: true },
    address: { type: String, required: true },
    relation: { type: String, required: true },
});

const studentSchema = new Schema<Student>({
  id: String,
  name: userNameSchema,
  gender: ["male", "female"], //enum type not array
  dateOfBirth: { type: String, required: true },
  contactNo: { type: String, required: true },
  emengencyContactNo: { type: String, required: true },
  email: { type: String, required: true },
  bloodGroup: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  gurdian: gurdianSchema,
  localGurdian: localGurdianSchema,
  profileImage: String,
  isActive: ["active", "blocked"],
});

export const StudentModel = model<Student>('Student', studentSchema);