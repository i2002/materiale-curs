import Link from "next/link";
import { CubeIcon } from "@heroicons/react/24/outline";
import SignOutButton from "./SignOutButton";

interface Props {
  title: string;
}

export default async function Header({ title }: Props) {
  return (
    <nav className="bg-slate-800">
      <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-shrink-0 items-center text-white text-xl">
            <Link href="/courses">
              <CubeIcon className="h-10 w-10 mr-1 hover:bg-slate-700/70 p-2 rounded-full transition-colors"></CubeIcon>
            </Link>
            <Link href="/courses">
              <h1>{title}</h1>
            </Link>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <SignOutButton className="text-slate-300 hover:bg-slate-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" />
          </div>
        </div>
      </div>
    </nav>
  );
}
