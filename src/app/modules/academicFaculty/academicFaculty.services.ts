import { TACademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const createAcademicFacultyIntoDB = async (payload: TACademicFaculty) => {
  const result = AcademicFaculty.create(payload);
  return result;
};
const updateAcademicFacultyIntoDB = async (
  id: string,
  payload: Partial<TACademicFaculty>
) => {
  const result = AcademicFaculty.findByIdAndUpdate(id, payload, {
    new: true,
  });

  if (!result) {
    throw new Error(`Academic Faculty with ID ${id} not found`);
  }

  return result;
};

const getAllAcademicFacultyFromDB = async () => {
  const result = AcademicFaculty.find({});
  return result;
};

const getSingleAcademicFacultyFromDB = async (id: string) => {
  const result = AcademicFaculty.findById({ id });
  return result;
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  updateAcademicFacultyIntoDB,
  getAllAcademicFacultyFromDB,
  getSingleAcademicFacultyFromDB,
};
