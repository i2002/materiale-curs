import { Table, TableBody, TableHead, TableHeaderCell, TableRow } from "@tremor/react";

interface Props {
  children: React.ReactNode;
}

export default function ResourceList({ children }: Props) {
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
        {children}
      </TableBody>
    </Table>
  );
}
