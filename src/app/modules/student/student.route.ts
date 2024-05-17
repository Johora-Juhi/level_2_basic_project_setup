import express from "express";
import { StudentController } from "./student.controller";
const router = express.Router();

router.post("/create_student", StudentController.createStudent); // will call controller function
router.get("/", StudentController.getAllStudents); // will call controller function
router.get("/:studentId", StudentController.getSingleStudent);

export const StudentRoutes = router;
