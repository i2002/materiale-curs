"use client"

import { Title } from "@tremor/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import links, { LinkItem } from "../links";

export default function Sidebar() {
  const isActive = (item: LinkItem) => usePathname().startsWith(item.path);

  return (
    <div className="bg-white w-60 h-screen">
      <div className="h-16 flex items-center justify-center border-b">
        <Title>Admin</Title>
      </div>
      <nav className="p-3 flex flex-col">
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
