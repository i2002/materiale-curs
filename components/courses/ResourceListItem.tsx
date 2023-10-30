import { Resource } from "@prisma/client";
import { TableCell, TableRow } from "@tremor/react";
import Link from "next/link";
import ResourceIcon from "@/components/ui/ResourceIcon";
import { AugumentedResource } from "@/lib/prisma";
import { getResSize, getResDate } from "@/lib/utils";


const getHref = (res: Resource, slug: string) => {
  let prefix = res.type == "folder" ? "folder" : "file";
  return `/courses/${slug}/${prefix}/${res.id}`;
}

export default function ResourceListItem({ resource, slug }: { resource: AugumentedResource, slug: string }) {
  return (
    <TableRow className="hover:bg-slate-100 active:bg-slate-50 border-y px-3 rounded-sm">
      <TableCell>
        <Link href={getHref(resource, slug)} className="flex items-center">
          <ResourceIcon type={resource.type} className="h-6 w-6 mr-3" />
          {resource.name}
        </Link>
      </TableCell>
      <TableCell>
        {getResSize(resource)}
      </TableCell>
      <TableCell title={getResDate(resource, "full")}>
        {getResDate(resource)}
      </TableCell>
    </TableRow>
  );
}
