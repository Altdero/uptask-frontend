import ProfileForm from "@/components/app/profile/ProfileForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | UpTask",
};

export default function ProfilePage() {
  return <ProfileForm />;
}
