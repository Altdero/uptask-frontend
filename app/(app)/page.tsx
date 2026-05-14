import Dashboard from "@/components/app/Dashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | UpTask",
};

export default function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <h1 className="text-center text-4xl font-black uppercase">
        My <span className="text-fuchsia-500">Projects</span>
      </h1>
      <p className="mt-2 text-center text-xl font-light text-gray-500">
        Manage and organize your projects
      </p>
      <Dashboard />
    </div>
  );
}
