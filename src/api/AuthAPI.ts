import { apiFetch } from "@/src/lib/utils/apiFetch";
import { userSchema } from "@/src/lib/schemas/authSchema";
import type {
  CheckPasswordForm,
  ConfirmToken,
  ForgotPasswordForm,
  NewPasswordForm,
  RequestConfirmationCodeForm,
  User,
  UserLoginForm,
  UserRegistrationForm,
} from "@/src/types";

export async function createAccount(formData: UserRegistrationForm) {
  return apiFetch<string>("/auth/create-account", "POST", formData);
}

export async function confirmAccount(formData: ConfirmToken) {
  return apiFetch<string>("/auth/confirm-account", "POST", formData);
}

export async function requestConfirmationCode(
  formData: RequestConfirmationCodeForm
) {
  return apiFetch<string>("/auth/request-code", "POST", formData);
}

export async function authenticateUser(formData: UserLoginForm) {
  const token = await apiFetch<string>("/auth/login", "POST", formData);
  localStorage.setItem("AUTH_TOKEN", token);
  return token;
}

export async function forgotPassword(formData: ForgotPasswordForm) {
  return apiFetch<string>("/auth/forgot-password", "POST", formData);
}

export async function validateToken(formData: ConfirmToken) {
  return apiFetch<string>("/auth/validate-token", "POST", formData);
}

export async function updatePasswordWithToken({
  formData,
  token,
}: {
  formData: NewPasswordForm;
  token: ConfirmToken["token"];
}) {
  return apiFetch<string>(`/auth/update-password/${token}`, "POST", formData);
}

export async function getUser(): Promise<User | undefined> {
  const data = await apiFetch<unknown>("/auth/user");
  const result = userSchema.safeParse(data);
  return result.success ? result.data : undefined;
}

export async function checkPassword(formData: CheckPasswordForm) {
  return apiFetch<string>("/auth/check-password", "POST", formData);
}
