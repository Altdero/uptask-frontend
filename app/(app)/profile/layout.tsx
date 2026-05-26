import ProfileTabs from "@/components/app/profile/ProfileTabs";
import type { ReactNode } from "react";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <h1 className="text-center text-4xl font-black uppercase">
        My <span className="text-fuchsia-500">Account</span>
      </h1>
      <p className="mt-2 text-center text-xl font-light text-gray-500">
        Manage your account
      </p>
      <ProfileTabs />
      {children}
    </div>
  );
}
