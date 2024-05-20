import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await Student.isStudentExists(studentData.id)) {
    throw new Error("User id already existss");
  }
  const result = await Student.create(studentData); //builtin static method

  // for creatin instance
  // const student = new Student(studentData);
  // if (await student.isStudentExists(studentData.id)) {
  //   throw new Error("User id already exists");
  // }

  // const result = await student.save();
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (studentId: string) => {
  const result = await Student.findOne({ id: studentId });
  return result;
};

const deleteStudentFromDB = async (studentId: string) => {
  const result = await Student.updateOne(
    { id: studentId },
    { isDeleted: true }
  );
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
