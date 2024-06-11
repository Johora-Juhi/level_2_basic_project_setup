import { z } from "zod";
import { days } from "./offeredCourses.constants";

const timeValidationSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?0-9 | 2[0-3]):[0-5][0-9]$/;
    return regex.test(time);
  },
  {
    message: "Invalid format! Starttime must be in HH:MM",
  }
);
const createOfferedCoursesValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      academicFaculty: z.string(),
      academicDepartment: z.string(),
      course: z.string(),
      faculty: z.string(),
      maxCapacity: z.number(),
      section: z.number(),
      days: z.array(z.enum([...(days as [string, ...string[]])])),
      startTime: timeValidationSchema,
      endTime: timeValidationSchema,
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return end > start;
      },
      {
        message: "Start time must be greater then End Time",
      }
    ),
});

const updateOfferedCoursesValidationSchema = z.object({
  body: z
    .object({
      faculty: z.string(),
      maxCapacity: z.number(),
      section: z.number(),
      days: z.array(z.enum([...(days as [string, ...string[]])])),
      startTime: timeValidationSchema,
      endTime: timeValidationSchema,
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return end > start;
      },
      {
        message: "Start time must be greater then End Time",
      }
    ),
});

export const offeredCoursesValidation = {
  createOfferedCoursesValidationSchema,
  updateOfferedCoursesValidationSchema,
};
