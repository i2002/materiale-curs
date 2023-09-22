import { DocumentIcon, FolderIcon } from "@heroicons/react/24/outline";
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

export default function ResourceListItem({ resource }: { resource: { name: string, type: string, size: string, modified: string, href: string }}) {
  return (
    <TableRow className="hover:bg-slate-100 active:bg-slate-50 border-y px-3 rounded-sm">
      <TableCell>
        <Link href={resource.href} className="flex items-center">
          <Icon type={resource.type} className="h-6 w-6 mr-2"></Icon>
          {resource.name}
        </Link>
      </TableCell>
      <TableCell>{resource.size}</TableCell>
      <TableCell>{resource.modified}</TableCell>
      </TableRow>
  );
}
