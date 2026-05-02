import Image from "next/image";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-100 px-4">
      <div className="mb-8">
        <Image src="./logo.svg" alt="UpTask" />
      </div>
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-sm">
        {children}
      </div>
    </div>
  );
}
