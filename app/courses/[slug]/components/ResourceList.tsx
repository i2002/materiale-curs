import { Table, TableBody, TableHead, TableHeaderCell, TableRow } from "@tremor/react";
import ResourceListItem from "./ResourceListItem";

export default function ResourceList({ resources }: { resources: Array<{ name: string, type: string, size: string, modified: string, href: string }>}) {
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
          <ResourceListItem resource={resource} key={resource.name}></ResourceListItem>
        ))}
      </TableBody>
    </Table>
  );
}
