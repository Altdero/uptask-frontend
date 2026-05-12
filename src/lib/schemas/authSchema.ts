import { z } from "zod";

export const authSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  current_password: z.string().min(1, "Current password is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  password_confirmation: z.string(),
});

export const userSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.email(),
});

export const userLoginSchema = authSchema.pick({ email: true, password: true });

export const userRegistrationSchema = authSchema
  .pick({
    name: true,
    email: true,
    password: true,
    password_confirmation: true,
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  });

export const requestConfirmationCodeSchema = authSchema.pick({ email: true });

export const forgotPasswordSchema = authSchema.pick({ email: true });

export const newPasswordSchema = authSchema
  .pick({ password: true, password_confirmation: true })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  });

export const updateCurrentUserPasswordSchema = authSchema
  .pick({
    current_password: true,
    password: true,
    password_confirmation: true,
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  });

export const confirmTokenSchema = z.object({
  token: z.string().length(6, "Token must be 6 digits long"),
});

export const checkPasswordSchema = z.object({
  password: z.string().min(8, "Your password is required"),
});

export const userProfileSchema = userSchema.pick({ name: true, email: true });
