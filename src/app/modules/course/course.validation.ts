import { z } from "zod";

const preRequitionValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});
const courseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    isDeleted: z.boolean().optional(),
    preRequisiteCourses: z.array(preRequitionValidationSchema).optional(),
  }),
});

const updateValidationSchema = courseValidationSchema.partial();

const assignFacultiesWithCoursesValidationSchema = z.object({
  body: z.object({
    course: z.string().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const courseValidations = {
  courseValidationSchema,
  updateValidationSchema,
  assignFacultiesWithCoursesValidationSchema,
};
