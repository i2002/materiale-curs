"use client";

import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { signOut, useSession } from "next-auth/react";

interface Props {
  className?: string;
}

export default function AccountOptionsMenu({ className }: Props) {
  const { data } = useSession();
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className={`inline-flex w-full justify-center rounded-md ${className}`}>
        {data?.user?.email ?? "Utilizator"}
        <ChevronDownIcon className="ml-1 -mr-1 h-5 w-5" aria-hidden="true" />
      </Menu.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none px-1 py-1">
          <Menu.Item
            as="a"
            onClick={() => signOut()}
            className="ui-active:bg-teal-500 ui-active:text-white ui-not-active:text-gray-900 cursor-pointer flex w-full items-center rounded-md px-2 py-2 text-sm"
          >
            Dezautentificare
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
