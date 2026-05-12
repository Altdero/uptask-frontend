import Image from "next/image";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-800 md:px-4">
      <div className="mb-4">
        <Image
          src="/logo.svg"
          alt="UpTask"
          width={300}
          height={105}
          loading="eager"
        />
      </div>
      <main className="w-full max-w-md rounded-xl p-6 shadow-sm">
        {children}
      </main>
    </div>
  );
}
