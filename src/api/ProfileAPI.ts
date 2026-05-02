import { apiFetch } from "@/src/lib/utils/apiFetch";
import type {
  UpdateCurrentUserPasswordForm,
  UserProfileForm,
} from "@/src/types";

export async function updateProfile(formData: UserProfileForm) {
  return apiFetch<string>("/auth/profile", "PUT", formData);
}

export async function changePassword(formData: UpdateCurrentUserPasswordForm) {
  return apiFetch<string>("/auth/update-password", "POST", formData);
}
