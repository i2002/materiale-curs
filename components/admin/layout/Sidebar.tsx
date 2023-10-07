"use client"

import { Title } from "@tremor/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import links, { LinkItem } from "../../../app/admin/links";

export default function Sidebar() {
  const pathname = usePathname();
  const isActive = (item: LinkItem) => pathname.startsWith(item.path);

  return (
    <div className="bg-white w-60 h-screen flex flex-col">
      <div className="h-16 flex items-center px-5 bg-teal-300 border-r border-r-teal-400 flex-shrink-0">
        <Title>Admin</Title>
      </div>
      <nav className="p-3 flex flex-col border-r border-teal-200 items-stretch h-full">
        {links.map((item, index) => (
          <Link className={`p-2 rounded-md hover:bg-slate-100 hover:text-teal-600 my-1 flex items-center ${isActive(item) ? "bg-slate-100" : ""}`} key={index} href={item.path}>
            <item.icon className={`h-4 w-4 mr-2 ${isActive(item) ? "text-teal-600" : ""}`}/>
            { item.title }
          </Link>
        ))}
      </nav>
    </div>
  );
}
