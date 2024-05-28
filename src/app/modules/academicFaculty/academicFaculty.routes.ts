import { Router } from "express";
import ValidateRequest from "../../middleware/validateRequest";
import { AcademicFacultyValidation } from "./academicFaculty.validation";
import { AcademicFacultyController } from "./academicFaculty.controller";

const router = Router();

router.post(
  "/create-faculty",
  ValidateRequest(AcademicFacultyValidation.AcademicFacultyValidationSchema),
  AcademicFacultyController.createAcademicFaculty
);
router.patch(
  "/:facultyId",
  ValidateRequest(AcademicFacultyValidation.AcademicFacultyValidationSchema),
  AcademicFacultyController.updateAcademicFaculty
);
router.get("/", AcademicFacultyController.getAllAcademicFaculty);
router.get("/:facultyId", AcademicFacultyController.getSingleAcademicFaculty);

export const AcademicFacultyRoutes = router;
