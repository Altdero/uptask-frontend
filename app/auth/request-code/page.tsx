import RequestConfirmationCodeForm from "@/components/auth/RequestConfirmationCodeForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confirmation Code | UpTask",
};

export default function RequestConfirmationCodePage() {
  return (
    <>
      <h1 className="text-4xl font-black text-white">
        Request Confirmation Code
      </h1>
      <p className="mt-2 text-xl font-light text-white">
        Enter your email to request your
        <span className="font-semibold text-fuchsia-500">
          {" "}
          confirmation code
        </span>
      </p>

      <RequestConfirmationCodeForm />
    </>
  );
}
