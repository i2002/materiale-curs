import { TableCell, TableRow } from "@tremor/react";

const LoadingListTableItem = ({ nr_rows, nr_cols}: {nr_rows: number, nr_cols: number}) => [...Array(nr_rows)].map((e, i) => (
  <TableRow className="animate-pulse border-y" key={`row-${i}`}>
    {[...Array(nr_cols)].map((e, j) => (
      <TableCell key={`item-${i}-${j}`}>
        <div className="h-2 my-2 bg-slate-300 rounded"></div>
      </TableCell>
    ))}
  </TableRow>
));

export default LoadingListTableItem;
