"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import links from "../../../app/admin/links";
import SignOutButton from "@/components/ui/SignOutButton";

export default function Header() {
  let pathname = usePathname();
  let getActiveLink = () => links.find(link => pathname.startsWith(link.path));
  return (
    <nav className="bg-teal-300">
      <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-shrink-0 items-center text-xl">
            <Link href={getActiveLink()?.path ?? "/admin"}>
              <h1>{getActiveLink()?.title ?? "Admin"}</h1>
            </Link>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <SignOutButton className="hover:bg-teal-200 rounded-md px-3 py-2 text-sm font-medium" />
          </div>
        </div>
      </div>
    </nav>
  );
}
