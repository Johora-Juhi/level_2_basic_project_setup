import express from "express";
import { StudentController } from "./student.controller";
import ValidateRequest from "../../middleware/validateRequest";
import { studentValidations } from "./student.validation";
const router = express.Router();

router.get("/", StudentController.getAllStudents); // will call controller function
router.get("/:studentId", StudentController.getSingleStudent);
router.patch(
  "/:studentId",
  ValidateRequest(studentValidations.updateStudentValidationSchema),
  StudentController.updateSingleStudent
);
router.delete("/:studentId", StudentController.deleteStudent);

export const StudentRoutes = router;
