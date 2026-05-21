import { z } from "zod";

export const teamMemberSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.email(),
});

export const teamMembersSchema = z.array(teamMemberSchema);

export const teamMemberFormSchema = z.object({
  email: z.email("Invalid email address"),
});
