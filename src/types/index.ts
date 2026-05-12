import type { z } from "zod";
import type {
  authSchema,
  userSchema,
  userLoginSchema,
  userRegistrationSchema,
  requestConfirmationCodeSchema,
  forgotPasswordSchema,
  newPasswordSchema,
  updateCurrentUserPasswordSchema,
  confirmTokenSchema,
  checkPasswordSchema,
  userProfileSchema,
} from "@/src/lib/schemas/authSchema";
import type { noteSchema } from "@/src/lib/schemas/noteSchema";
import type {
  taskSchema,
  taskStatusSchema,
  taskProjectSchema,
} from "@/src/lib/schemas/taskSchema";
import type {
  projectSchema,
  dashboardProjectSchema,
  editProjectSchema,
} from "@/src/lib/schemas/projectSchema";
import type {
  teamMemberSchema,
  teamMembersSchema,
} from "@/src/lib/schemas/teamSchema";

/** Auth */
export type Auth = z.infer<typeof authSchema>;
export type User = z.infer<typeof userSchema>;
export type UserLoginForm = z.infer<typeof userLoginSchema>;
export type UserRegistrationForm = z.infer<typeof userRegistrationSchema>;
export type RequestConfirmationCodeForm = z.infer<
  typeof requestConfirmationCodeSchema
>;
export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;
export type NewPasswordForm = z.infer<typeof newPasswordSchema>;
export type UpdateCurrentUserPasswordForm = z.infer<
  typeof updateCurrentUserPasswordSchema
>;
export type ConfirmToken = z.infer<typeof confirmTokenSchema>;
export type CheckPasswordForm = z.infer<typeof checkPasswordSchema>;
export type UserProfileForm = z.infer<typeof userProfileSchema>;

/** Tasks */
export type TaskStatus = z.infer<typeof taskStatusSchema>;
export type Task = z.infer<typeof taskSchema>;
export type TaskFormData = Pick<Task, "name" | "description">;
export type TaskProject = z.infer<typeof taskProjectSchema>;

/** Notes */
export type Note = z.infer<typeof noteSchema>;
export type NoteFormData = Pick<Note, "content">;

/** Projects */
export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<
  Project,
  "clientName" | "projectName" | "description"
>;
export type DashboardProject = z.infer<typeof dashboardProjectSchema>[number];
export type EditProject = z.infer<typeof editProjectSchema>;

/** Team */
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TeamMembers = z.infer<typeof teamMembersSchema>;
export type TeamMemberForm = Pick<TeamMember, "email">;
