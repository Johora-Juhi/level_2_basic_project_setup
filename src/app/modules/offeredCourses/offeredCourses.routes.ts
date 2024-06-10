import { Router } from "express";
import ValidateRequest from "../../middleware/validateRequest";
import { offeredCoursesValidation } from "./offeredCourses.validation";
import { offeredCoursesControllers } from "./offeredCourses.controller";

const router = Router();

router.post(
  "/create_offered_course",
  ValidateRequest(
    offeredCoursesValidation.createOfferedCoursesValidationSchema
  ),
  offeredCoursesControllers.createOfferedCourses
);

export const offeredCoursesRoutes = router;
