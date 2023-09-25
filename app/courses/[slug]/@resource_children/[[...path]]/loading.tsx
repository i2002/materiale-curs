import { TableCell, TableRow } from "@tremor/react";

const nr_cols = 3;
const nr_rows = 3;

export default function Loading() {
  return (
    <>
      {[...Array(nr_rows)].map((e, i) => (
        <TableRow className="animate-pulse border-y" key={i}>
          {[...Array(nr_cols)].map((e, j) => (
            <TableCell key={j}>
              <div className="h-2 my-2 bg-slate-300 rounded"></div>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
