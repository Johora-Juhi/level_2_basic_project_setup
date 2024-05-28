import { Model, Types } from "mongoose";

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
  relation: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  name: TUserName;
  gender: "male" | "female";
  dateOfBirth: string;
  contactNo: string;
  emergencyContactNo: string;
  email: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  admissionSemester: Types.ObjectId;
  profileImage?: string;
};

// for creatin custom stattic method
export interface StudentModel extends Model<TStudent> {
  isStudentExists(id: string): Promise<TStudent | null>;
}
// for creatin custom instacce method
// export type StudentMethods = {
//   isStudentExists(id:string) : Promise<TStudent | null>
// }

// export type StudentModel = Model<TStudent, {}, StudentMethods>
