import { Router } from "express";
import { AcademicSemesterController } from "./academicSemester.controller";

const router = Router();

router.post(
  "/create-academicSemester",
  AcademicSemesterController.createAcademicSemester
);

export const AcademicSemesterRoutes = router;
