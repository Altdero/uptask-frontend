import Navbar from "@/components/ui/Navbar";
import type { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-screen-2xl flex-col bg-zinc-100">
      <Navbar />
      <main className="mt-6 w-full flex-1 p-5">{children}</main>
      <footer className="py-5">
        <p className="text-center">
          All rights reserved {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
