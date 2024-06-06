import { Router } from "express";
import ValidateRequest from "../../middleware/validateRequest";
import { semesterRegistrationValidations } from "./semeterRegistration.validation";
import { semesterRegistrationController } from "./semesterRegistration.controller";

const router = Router();

router.post(
  "/create_semester",
  ValidateRequest(
    semesterRegistrationValidations.createSemesterRegistrationValidationSchema
  ),
  semesterRegistrationController.createSemesterRegistration
);

router.get("/", semesterRegistrationController.getAllSemesterRegistration);
router.get(
  "/:id",
  semesterRegistrationController.getSingleSemesterRegistration
);
router.patch(
  "/:id",
  ValidateRequest(
    semesterRegistrationValidations.updateSemesterRegistrationValidationSchema
  ),
  semesterRegistrationController.updateSemesterRegistration
);
export const semesterRegistrationRoutes = router;
