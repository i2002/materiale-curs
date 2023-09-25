import { DocumentIcon, FolderIcon } from "@heroicons/react/24/outline";
import { Resource } from "@prisma/client";
import { TableCell, TableRow } from "@tremor/react";
import Link from "next/link";

// FIXME: icon types
interface IconProps extends React.ComponentPropsWithoutRef<"svg"> {
  type: string;
}

const Icon = ({ type, ...props }: IconProps) => {
  switch(type) {
    case "folder":
      return <FolderIcon {...props}></FolderIcon>;
    case "document":
      return <DocumentIcon {...props}></DocumentIcon>;
  }

  return null;
}

const getHref = (res: Resource, slug: string) => {
  let prefix = res.type == "folder" ? "resource" : "preview";
  return `/courses/${slug}/${prefix}/${res.id}`;
}

// FIXME: last modified and size

export default function ResourceListItem({ resource, slug }: { resource: Resource, slug: string }) {
  return (
    <TableRow className="hover:bg-slate-100 active:bg-slate-50 border-y px-3 rounded-sm">
      <TableCell>
        <Link href={getHref(resource, slug)} className="flex items-center">
          <Icon type={resource.type} className="h-6 w-6 mr-2"></Icon>
          {resource.name}
        </Link>
      </TableCell>
      <TableCell>{"1"}</TableCell>
      <TableCell>{"20 aug"}</TableCell>
      </TableRow>
  );
}
