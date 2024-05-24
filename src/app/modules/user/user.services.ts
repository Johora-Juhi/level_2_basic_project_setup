import config from "../../config";
import { TStudent } from "../student/student.interface";
import { NewUser, TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (password : string, studentData: TStudent) => {
  // if (await Student.isStudentExists(studentData.id)) {
  //   throw new Error("User id already existss");
    // }
    const user: NewUser = {};

    // set user password 
    user.password = password || (config.default_password as string);

    // set student role 
    user.role = 'student';

    // set student id 
    user.id = '20242405001';

    // create user 
    const result = await User.create(user); //builtin static method

    if (Object.keys(result).length) {
        // set student id 
        studentData.id = result.id,
        studentData.user = result._id,
}

    

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
