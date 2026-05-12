import SignUpForm from "@/components/auth/SignUpForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account | UpTask",
};

export default function LoginPage() {
  return (
    <>
      <h1 className="text-4xl font-black text-white">Sign Up</h1>
      <p className="mt-2 text-xl font-light text-white">
        Create your new
        <span className="font-semibold text-fuchsia-500"> account</span>
      </p>

      <SignUpForm />
    </>
  );
}
