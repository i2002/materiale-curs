import { Table, TableBody, TableHead, TableHeaderCell, TableRow } from "@tremor/react";
import ResourceListItem from "./ResourceListItem";
import { Resource } from "@prisma/client";

export default function ResourceList({ resources, slug }: { resources: Array<Resource>, slug: string }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell className="w-3/4">Nume</TableHeaderCell>
          <TableHeaderCell>Dimensiune</TableHeaderCell>
          <TableHeaderCell>Ultima modificare</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {resources.map(resource => (
          <ResourceListItem resource={resource} slug={slug} key={resource.name}></ResourceListItem>
        ))}
      </TableBody>
    </Table>
  );
}
