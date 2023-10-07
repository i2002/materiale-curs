import { TableCell, TableRow } from "@tremor/react";
import { TableItem } from "./ListTable";
import Link from "next/link";

const ListTableItem = ({ item }: { item: TableItem }) => (
  <TableRow className="hover:bg-slate-100 border-y">
    {item.data.map(column => (
      <TableCell key={column}>
        <Link href={item.href}>
          {column}
        </Link>
      </TableCell>
    ))}
    <TableCell>
      {item.actions.map(btn => (
        <Link href={btn.href} key={btn.name}>
          <button title={btn.name} className="h-4 w-4 flex items-center">
            {btn.icon}
          </button>
        </Link>
      ))}
    </TableCell>
  </TableRow>
);

export default ListTableItem;
