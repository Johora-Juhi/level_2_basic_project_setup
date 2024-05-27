import { Router } from "express";
import { AcademicSemesterController } from "./academicSemester.controller";
import { AcademicSemesterValidations } from "./academicSemester.validation";
import ValidateRequest from "../../middleware/validateRequest";

const router = Router();

router.post(
  "/create-semester",
  ValidateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema
  ),
  AcademicSemesterController.createAcademicSemester
);
router.get("/", AcademicSemesterController.getAllAcademicSemester);
router.get(
  "/:semesterId",
  AcademicSemesterController.getSingleAcademicSemester
);

export const AcademicSemesterRoutes = router;
