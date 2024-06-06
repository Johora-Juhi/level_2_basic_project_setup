import { Router } from "express";
import ValidateRequest from "../../middleware/validateRequest";
import { semesterRegistrationValidations } from "./semeterRegistration.validation";
import { semesterRegistrationController } from "./semesterRegistration.controller";

const router = Router();

router.post(
  "/",
  ValidateRequest(
    semesterRegistrationValidations.createSemesterRegistrationValidationSchema
  ),
  semesterRegistrationController.createSemesterRegistration
);

export const semesterRegistrationRoutes = router;
