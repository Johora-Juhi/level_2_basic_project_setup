import express from "express";
import ValidateRequest from "../../middleware/validateRequest";
import { FacultyControllers } from "./faculty.controller";
import { updateFacultyValidationSchema } from "./faculty.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constants";

const router = express.Router();

router.get("/:id", FacultyControllers.getSingleFaculty);

router.patch(
  "/:id",
  ValidateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty
);

router.delete("/:id", FacultyControllers.deleteFaculty);

router.get("/", auth(USER_ROLE.admin), FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;
