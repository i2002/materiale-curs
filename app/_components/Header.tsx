import Link from "next/link";

export default async function Header({ title }: { title: string }) {
  return (
    <nav className="bg-slate-800">
      <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-shrink-0 items-center text-white text-xl">
            {/* <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            /> */}
            <Link href="/courses">
              <h1>{title}</h1>
            </Link>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Link href="/api/auth/signout" className="text-slate-300 hover:bg-slate-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">
              Sign Out
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}