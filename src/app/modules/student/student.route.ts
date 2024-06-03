import express from "express";
import { StudentController } from "./student.controller";
import ValidateRequest from "../../middleware/validateRequest";
import { studentValidations } from "./student.validation";
const router = express.Router();

router.get("/", StudentController.getAllStudents); // will call controller function
router.get("/:id", StudentController.getSingleStudent);
router.patch(
  "/:id",
  ValidateRequest(studentValidations.updateStudentValidationSchema),
  StudentController.updateSingleStudent
);
router.delete("/:id", StudentController.deleteStudent);

export const StudentRoutes = router;
