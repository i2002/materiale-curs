"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import links from "../links";

export default function Header() {
  let pathname = usePathname();
  let getActiveTitle = () => links.find(link => pathname.startsWith(link.path))?.title ?? "Admin"
  return (
    <nav className="bg-white">
      <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-shrink-0 items-center text-xl">
            <Link href="/courses">
              <h1>{getActiveTitle()}</h1>
            </Link>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Link href="/api/auth/signout" className="hover:bg-slate-100 rounded-md px-3 py-2 text-sm font-medium">
              Sign Out
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
