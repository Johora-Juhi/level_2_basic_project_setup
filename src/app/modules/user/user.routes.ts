import express from "express";
import { UserController } from "./user.controller";
import ValidateRequest from "../../middleware/validateRequest";
import { studentValidations } from "../student/student.validation";
import { USER_ROLE } from "./user.constants";
import auth from "../../middleware/auth";

const router = express.Router();

router.post(
  "/create_student",
  auth(USER_ROLE.admin),
  ValidateRequest(studentValidations.createStudentValidationSchema),
  UserController.createStudent
);

export const UserRoutes = router;
