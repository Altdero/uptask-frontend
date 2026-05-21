import type {
  authSchema,
  checkPasswordSchema,
  confirmAccountSchema,
  forgotPasswordSchema,
  newPasswordSchema,
  requestConfirmationCodeSchema,
  updateCurrentUserPasswordSchema,
  userLoginSchema,
  userProfileSchema,
  userRegistrationSchema,
  userSchema,
} from "@/src/lib/schemas/authSchema";
import type { noteFormSchema, noteSchema } from "@/src/lib/schemas/noteSchema";
import type {
  dashboardProjectSchema,
  editProjectSchema,
  projectSchema,
} from "@/src/lib/schemas/projectSchema";
import type {
  taskProjectSchema,
  taskSchema,
  taskStatusSchema,
} from "@/src/lib/schemas/taskSchema";
import type {
  teamMemberFormSchema,
  teamMemberSchema,
  teamMembersSchema,
} from "@/src/lib/schemas/teamSchema";
import type { z } from "zod";

/** Auth */
export type AuthType = z.infer<typeof authSchema>;
export type UserType = z.infer<typeof userSchema>;
export type UserLoginType = z.infer<typeof userLoginSchema>;
export type UserRegistrationType = z.infer<typeof userRegistrationSchema>;
export type RequestConfirmationCodeType = z.infer<
  typeof requestConfirmationCodeSchema
>;
export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;
export type NewPasswordType = z.infer<typeof newPasswordSchema>;
export type UpdateCurrentUserPasswordType = z.infer<
  typeof updateCurrentUserPasswordSchema
>;
export type ConfirmAccountType = z.infer<typeof confirmAccountSchema>;
export type CheckPasswordType = z.infer<typeof checkPasswordSchema>;
export type UserProfileType = z.infer<typeof userProfileSchema>;

/** Tasks */
export type TaskStatusType = z.infer<typeof taskStatusSchema>;
export type TaskType = z.infer<typeof taskSchema>;
export type TaskFormDataType = Pick<TaskType, "name" | "description">;
export type TaskProjectType = z.infer<typeof taskProjectSchema>;

/** Notes */
export type NoteType = z.infer<typeof noteSchema>;
export type NoteFormDataType = z.infer<typeof noteFormSchema>;

/** Projects */
export type ProjectType = z.infer<typeof projectSchema>;
export type ProjectFormDataType = Pick<
  ProjectType,
  "clientName" | "projectName" | "description"
>;
export type DashboardProjectType = z.infer<
  typeof dashboardProjectSchema
>[number];
export type EditProjectType = z.infer<typeof editProjectSchema>;

/** Team */
export type TeamMemberType = z.infer<typeof teamMemberSchema>;
export type TeamMembersType = z.infer<typeof teamMembersSchema>;
export type TeamMemberFormType = z.infer<typeof teamMemberFormSchema>;
