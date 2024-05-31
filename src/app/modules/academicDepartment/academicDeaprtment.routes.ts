import { Router } from "express";
import ValidateRequest from "../../middleware/validateRequest";
import { AcademicDepartmentValidations } from "./academicDepartment.validation";
import { AcademicDepartmentController } from "./academicDepartment.controller";

const router = Router();

router.post(
  "/create-department",
  // ValidateRequest(
  //   AcademicDepartmentValidations.createAcademicDepartmentValidationSchema
  // ),
  AcademicDepartmentController.createAcademicDepartment
);
router.patch(
  "/:departmentId",
  ValidateRequest(
    AcademicDepartmentValidations.updateAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentController.updateAcademicDepartment
);
router.get("/", AcademicDepartmentController.getAllAcademicDepartment);
router.get(
  "/:departmentId",
  AcademicDepartmentController.getSingleAcademicDepartment
);

export const AcademicDepartmentRoutes = router;
