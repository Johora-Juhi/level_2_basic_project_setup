import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // if (await Student.isStudentExists(studentData.id)) {
  //   throw new Error("User id already existss");
  // }
  const userData: Partial<TUser> = {};

  // set user password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = "student";

  // set student id
  userData.id = "20242405002";

  // create user
  const newUser = await User.create(userData); //builtin static method

  if (Object.keys(newUser).length) {
    // set student id
    studentData.id = newUser.id;
    studentData.user = newUser._id;

    const newStudent = await Student.create(studentData);

    return newStudent;
  }

  // for creatin instance
  // const student = new Student(studentData);
  // if (await student.isStudentExists(studentData.id)) {
  //   throw new Error("User id already exists");
  // }

  // const result = await student.save();
};

export const UserServices = {
  createStudentIntoDB,
};
