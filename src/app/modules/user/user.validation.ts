import { z } from "zod";

const UserValidationSchema = z.object({
  password: z.string().min(8, { message: "Password must be of 8 length" }),
});

export const UserValidation = {
  UserValidationSchema,
};
