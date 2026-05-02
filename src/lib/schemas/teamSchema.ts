import { z } from "zod";

export const teamMemberSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.email(),
});

export const teamMembersSchema = z.array(teamMemberSchema);
