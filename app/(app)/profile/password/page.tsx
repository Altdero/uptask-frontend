import UpdateCurrentUserPasswordForm from "@/components/app/profile/UpdateCurrentUserPasswordForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile - Change Password | UpTask",
};

export default function UpdateCurrentUserPasswordPage() {
  return <UpdateCurrentUserPasswordForm />;
}
