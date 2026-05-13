import { userSchema } from "@/src/lib/schemas/authSchema";
import { apiFetch } from "@/src/lib/utils/apiFetch";
import type {
  CheckPasswordType,
  ConfirmAccountType,
  ForgotPasswordType,
  NewPasswordType,
  RequestConfirmationCodeType,
  UserLoginType,
  UserRegistrationType,
  UserType,
} from "@/src/types";

export async function createAccount(formData: UserRegistrationType) {
  return apiFetch<string>("/auth/create-account", "POST", formData);
}

export async function confirmAccount(formData: ConfirmAccountType) {
  return apiFetch<string>("/auth/confirm-account", "POST", formData);
}

export async function requestConfirmationCode(
  formData: RequestConfirmationCodeType
) {
  return apiFetch<string>("/auth/request-code", "POST", formData);
}

export async function authenticateUser(formData: UserLoginType) {
  const token = await apiFetch<string>("/auth/login", "POST", formData);
  localStorage.setItem("AUTH_TOKEN", token);
  return token;
}

export async function forgotPassword(formData: ForgotPasswordType) {
  return apiFetch<string>("/auth/forgot-password", "POST", formData);
}

export async function validateToken(formData: ConfirmAccountType) {
  return apiFetch<string>("/auth/validate-token", "POST", formData);
}

export async function updatePasswordWithToken({
  formData,
  token,
}: {
  formData: NewPasswordType;
  token: ConfirmAccountType["token"];
}) {
  return apiFetch<string>(`/auth/update-password/${token}`, "POST", formData);
}

export async function getUser(): Promise<UserType | undefined> {
  const data = await apiFetch<unknown>("/auth/user");
  const result = userSchema.safeParse(data);
  return result.success ? result.data : undefined;
}

export async function checkPassword(formData: CheckPasswordType) {
  return apiFetch<string>("/auth/check-password", "POST", formData);
}
