"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  root: string;
  tabs: Array<{
    label: string;
    href: string;
  }>
}

export default function TabList({ root, tabs }: Props) {
  let pathname = usePathname();
  const getState = (tabHref: string) => pathname == `${root}/${tabHref}` ? "selected" : "";

  return (
    <div className="flex justify-start overflow-x-clip space-x-4 border-b">
      {tabs.map(tab => (
        <Link href={`${root}/${tab.href}`} data-headlessui-state={getState(tab.href)} key={tab.href} className="flex truncate max-w-xs outline-none focus:ring-0 text-gray-500 ui-selected:text-teal-500 ui-selected:border-b-2 hover:border-b-2 hover:border-gray-500 hover:text-gray-700 border-transparent ui-selected:border-teal-500 -mb-px px-2 py-2 text-sm">
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
