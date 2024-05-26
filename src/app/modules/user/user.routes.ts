import express from "express";
import { UserController } from "./user.controller";
import ValidateRequest from "../../middleware/validateRequest";
import { studentValidations } from "../student/student.validation";

const router = express.Router();

router.post(
  "/create_student",
  ValidateRequest(studentValidations.createStudentValidationSchema),
  UserController.createStudent
);

export const UserRoutes = router;
