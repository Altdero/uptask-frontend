import { z } from "zod";
import { userSchema } from "@/src/lib/schemas/authSchema";

export const noteSchema = z.object({
  _id: z.string(),
  content: z.string(),
  createdBy: userSchema,
  task: z.string(),
  createdAt: z.string(),
});
