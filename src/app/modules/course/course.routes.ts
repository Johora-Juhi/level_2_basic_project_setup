import { Router } from "express";
import ValidateRequest from "../../middleware/validateRequest";
import { courseValidations } from "./course.validation";
import { courseControllers } from "./course.controller";

const router = Router();

router.post(
  "/create-course",
  ValidateRequest(courseValidations.courseValidationSchema),
  courseControllers.createCourse
);
// router.patch(
//   "/:departmentId",
//   ValidateRequest(
//     AcademicDepartmentValidations.updateAcademicDepartmentValidationSchema
//   ),
//   AcademicDepartmentController.updateAcademicDepartment
// );
router.get("/", courseControllers.getAllCourse);
router.get("/:id", courseControllers.getSingleCourse);
router.delete("/:id", courseControllers.deleteCourse);

export const CourseRoutes = router;
