import { z } from "zod";

export const authSchema = z.object({
  name: z.string(),
  email: z.email(),
  current_password: z.string(),
  password: z.string(),
  password_confirmation: z.string(),
  token: z.string(),
});

export const userSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.email(),
});
