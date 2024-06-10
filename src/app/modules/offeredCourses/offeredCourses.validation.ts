import { z } from "zod";
import { days } from "./offeredCourses.constants";

const createOfferedCoursesValidationSchema = z.object({
  body: z.object({
    semesterRegistration: z.string(),
    academicSemester: z.string(),
    academicFaculty: z.string(),
    academicDepartment: z.string(),
    course: z.string(),
    faculty: z.string(),
    maxCapacity: z.number(),
    section: z.number(),
    days: z.enum([...(days as [string, ...string[]])]),
    startTime: z.string(),
    endTime: z.string(),
  }),
});

const updateOfferedCoursesValidationSchema = z.object({
  body: z.object({
    faculty: z.string().optional(),
    maxCapacity: z.number().optional(),
    section: z.number().optional(),
    days: z.enum([...(days as [string, ...string[]])]).optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  }),
});

export const offeredCoursesValidation = {
  createOfferedCoursesValidationSchema,
  updateOfferedCoursesValidationSchema,
};
