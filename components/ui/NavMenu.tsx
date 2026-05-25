"use client";

import {
  CloseButton,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useSWRConfig } from "swr";
import useGetData from "@/src/hooks/useGetData";
import { userSchema } from "@/src/lib/schemas/authSchema";

export default function NavMenu() {
  const { mutate } = useSWRConfig();
  const { data } = useGetData({
    url: "/auth/user",
    schema: userSchema,
  });

  const logout = async () => {
    localStorage.removeItem("AUTH_TOKEN");
    await mutate(() => true, undefined, { revalidate: true });
  };

  return (
    <Popover className="relative">
      <PopoverButton className="block cursor-pointer rounded-lg border border-purple-400 bg-purple-400 p-1 font-semibold text-white">
        <Bars3Icon className="h-8 w-8 text-white" />
      </PopoverButton>
      <PopoverPanel
        transition
        anchor="bottom end"
        className="min-w-32 divide-y divide-purple-400 rounded-xl border border-purple-400 bg-gray-800 text-sm/6 text-white transition duration-200 ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-1 data-closed:opacity-0"
      >
        <div>
          <p className="p-3 text-center font-semibold">{data?.name}</p>
        </div>
        <div>
          <CloseButton
            as={Link}
            href="/profile"
            className="block w-full px-3 py-2 text-left transition hover:bg-purple-400 hover:text-purple-900"
          >
            Profile
          </CloseButton>
          <CloseButton
            as={Link}
            href="/"
            className="block w-full px-3 py-2 text-left transition hover:bg-purple-400 hover:text-purple-900"
          >
            Projects
          </CloseButton>
          <CloseButton
            className="block w-full cursor-pointer px-3 py-2 text-left transition hover:bg-purple-400 hover:text-purple-900"
            type="button"
            onClick={logout}
          >
            Logout
          </CloseButton>
        </div>
      </PopoverPanel>
    </Popover>
  );
}
