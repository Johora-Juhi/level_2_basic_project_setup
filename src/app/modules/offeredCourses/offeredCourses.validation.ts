import { z } from "zod";
import { days } from "./offeredCourses.constants";

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
      startTime: z.string().refine(
        (time) => {
          const regex = /^([01]?0-9 | 2[0-3]):[0-5][0-9]$/;
          return regex.test(time);
        },
        {
          message: "Invalid format! Starttime must be in HH:MM",
        }
      ),
      endTime: z.string().refine(
        (time) => {
          const regex = /^([01]?0-9 | 2[0-3]):[0-5][0-9]$/;
          return regex.test(time);
        },
        {
          message: "Invalid format! Endtime must be in HH:MM",
        }
      ),
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
  body: z.object({
    faculty: z.string().optional(),
    maxCapacity: z.number().optional(),
    section: z.number().optional(),
    days: z.array(z.enum([...(days as [string, ...string[]])])).optional(),
    startTime: z
      .string()
      .refine(
        (time) => {
          const regex = /^([01]?0-9 | 2[0-3]):[0-5][0-9]$/;
          return regex.test(time);
        },
        {
          message: "Invalid format! Starttime must be in HH:MM",
        }
      )
      .optional(),
    endTime: z
      .string()
      .refine(
        (time) => {
          const regex = /^([01]?0-9 | 2[0-3]):[0-5][0-9]$/;
          return regex.test(time);
        },
        {
          message: "Invalid format! Endtime must be in HH:MM",
        }
      )
      .optional(),
  }),
});

export const offeredCoursesValidation = {
  createOfferedCoursesValidationSchema,
  updateOfferedCoursesValidationSchema,
};
