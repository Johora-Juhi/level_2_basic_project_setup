import { z } from "zod";

const UserValidationSchema = z.object({
  id: z.string(),
  password: z.string().min(8, { message: "Password must be of 8 length" }),
  needsPasswordChange: z.boolean().optional().default(true),
  role: z.enum(["student", "faculty", "admin"]),
  status: z.enum(["in-process", "blocked"]).optional().default("in-process"),
  isDeleted: z.boolean().optional().default(false),
});

export const UserValidation = {
  UserValidationSchema,
};
