"use client";

import { FingerPrintIcon, UserIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { name: "My Account", href: "/profile", icon: UserIcon },
  { name: "Change Password", href: "/profile/password", icon: FingerPrintIcon },
];

export default function ProfileTabs() {
  const pathname = usePathname();

  return (
    <div className="mt-5 mb-10 border-b border-zinc-200">
      <nav className="flex space-x-8">
        {tabs.map(({ name, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={name}
              href={href}
              className={`group inline-flex items-center border-b-2 px-1 py-4 text-sm font-bold uppercase transition duration-200 ${isActive ? "border-fuchsia-500 text-fuchsia-600" : "border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700"}`}
            >
              <Icon
                className={`mr-2 size-6 ${isActive ? "text-fuchsia-500" : "text-zinc-400 group-hover:text-zinc-500"}`}
              />
              <span>{name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
