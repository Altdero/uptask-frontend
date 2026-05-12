import ConfirmAccountForm from "@/components/auth/ConfirmAccountForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confirm Account | UpTask",
};

export default function ConfirmAccountPage() {
  return (
    <>
      <h1 className="text-4xl font-black text-white">Confirm Account</h1>
      <p className="mt-2 text-xl font-light text-white">
        Enter the
        <span className="font-semibold text-fuchsia-500"> code </span>
        you received by email
      </p>

      <ConfirmAccountForm />
    </>
  );
}
