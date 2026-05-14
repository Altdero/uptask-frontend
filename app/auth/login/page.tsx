import LoginForm from "@/components/auth/LoginForm";
import Loader from "@/components/ui/icons/Loader";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sign In | UpTask",
};

export default function LoginPage() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <h1 className="text-4xl font-black text-white">Sign In</h1>
        <p className="mt-2 text-xl font-light text-white">
          <span className="font-semibold text-fuchsia-500">Administrate </span>
          your projects
        </p>

        <LoginForm />
      </Suspense>
    </>
  );
}
