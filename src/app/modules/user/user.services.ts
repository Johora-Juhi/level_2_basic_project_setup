import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (studentData: TUser) => {
  // if (await Student.isStudentExists(studentData.id)) {
  //   throw new Error("User id already existss");
  // }
  const result = await User.create(studentData); //builtin static method

  // for creatin instance
  // const student = new Student(studentData);
  // if (await student.isStudentExists(studentData.id)) {
  //   throw new Error("User id already exists");
  // }

  // const result = await student.save();
  return result;
};

export const UserServices = {
  createStudentIntoDB,
};
