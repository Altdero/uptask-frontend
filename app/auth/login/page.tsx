import LoginForm from "@/components/auth/LoginForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | UpTask",
};

export default function LoginPage() {
  return (
    <>
      <h1 className="text-4xl font-black text-white">Sign In</h1>
      <p className="mt-2 text-xl font-light text-white">
        <span className="font-semibold text-fuchsia-500">Administrate </span>
        your projects
      </p>

      <LoginForm />
    </>
  );
}
