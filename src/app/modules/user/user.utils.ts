import { TAcademicSemester } from "../academicSemester/academicSemester.interface";

export const generateStudentId = (payload: TAcademicSemester) => {
  const currentId = 0;

  const uniqueId = (currentId + 1).toString().padStart(4, "0");
  const studentId = `${payload.year}${payload.code}${uniqueId}`;
  return studentId;
};
