import { AugumentedResource } from "@/lib/controllers/resourceController";
import { Resource } from "@prisma/client";
import { TableCell, TableRow } from "@tremor/react";
import Link from "next/link";
import ResourceIcon from "../ui/ResourceIcon";
import getResSize from "@/lib/utils";


const getHref = (res: Resource, slug: string) => {
  let prefix = res.type == "folder" ? "resource" : "preview";
  return `/courses/${slug}/${prefix}/${res.id}`;
}

export default function ResourceListItem({ resource, slug }: { resource: AugumentedResource, slug: string }) {
  return (
    <TableRow className="hover:bg-slate-100 active:bg-slate-50 border-y px-3 rounded-sm">
      <TableCell>
        <Link href={getHref(resource, slug)} className="flex items-center">
          <ResourceIcon type={resource.type} className="h-6 w-6 mr-3"></ResourceIcon>
          {resource.name}
        </Link>
      </TableCell>
      <TableCell>{getResSize(resource)}</TableCell>
      <TableCell>{"-"}</TableCell>
    </TableRow>
  );
}
