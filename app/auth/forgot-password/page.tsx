import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | UpTask",
};

export default function ForgotPasswordPage() {
  return (
    <>
      <h1 className="text-4xl font-black text-white">Reset Password</h1>
      <p className="mt-2 text-xl font-light text-white">
        Enter your email and submit to
        <span className="font-semibold text-fuchsia-500">
          {" "}
          receive instructions
        </span>
      </p>

      <ForgotPasswordForm />
    </>
  );
}
