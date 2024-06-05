import { Router } from "express";
import ValidateRequest from "../../middleware/validateRequest";
import { courseValidations } from "./course.validation";
import { courseControllers } from "./course.controller";

const router = Router();

router.post(
  "/create_course",
  ValidateRequest(courseValidations.courseValidationSchema),
  courseControllers.createCourse
);
router.patch(
  "/:id",
  ValidateRequest(courseValidations.updateValidationSchema),
  courseControllers.updateCourse
);
router.get("/", courseControllers.getAllCourse);
router.get("/:id", courseControllers.getSingleCourse);
router.delete("/:id", courseControllers.deleteCourse);

export const CourseRoutes = router;
