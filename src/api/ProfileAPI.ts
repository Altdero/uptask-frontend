import { apiFetch } from "@/src/lib/utils/apiFetch";
import type {
  UpdateCurrentUserPasswordType,
  UserProfileType,
} from "@/src/types";

export async function updateProfile(formData: UserProfileType) {
  return apiFetch<string>("/auth/profile", "PUT", formData);
}

export async function changePassword(formData: UpdateCurrentUserPasswordType) {
  return apiFetch<string>("/auth/update-password", "POST", formData);
}
