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
    preRequisiteCourses: z.array(preRequitionValidationSchema),
  }),
});

export const courseValidations = {
  courseValidationSchema,
};
