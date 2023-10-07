import { Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@tremor/react";
import { Suspense } from "react";
import LoadingListTableItem from "./ListTableLoading";
import ListTableItem from "./ListTableItem";

interface ActionButton {
  name: string;
  icon: React.ReactNode;
  href: string;
}

export interface TableItem {
  data: string[];
  actions: Array<ActionButton>;
  href: string;
}

type GetTableItems = () => Promise<Array<TableItem>>;

interface Props {
  columns: string[];
  getItems: GetTableItems;
}

interface ContentProps {
  getItems: GetTableItems;
  cols: number;
}


const EmptyRow = ({ cols }: { cols: number }) => (
  <TableRow>
    <TableCell colSpan={cols + 1} className="text-center">Nu există date.</TableCell>
  </TableRow>
);

const RenderItems = async ({ getItems, cols }: ContentProps) => {
  let items = await getItems();
  return items.length ? items.map(item => (
    <ListTableItem item={item} key={item.data[0]}></ListTableItem>
  )) : <EmptyRow cols={cols}></EmptyRow>;
}

export default function ListTable({ columns, getItems }: Props) {
  return (
    <Card className="py-4">  
      <Table className="data-table">
        <TableHead>
          <TableRow>
            {columns.map((col, index) => (
              <TableHeaderCell className={index == 0 ? "w-full" : "w-40"} key={col}>{col}</TableHeaderCell>
            ))}
            <TableHeaderCell className="w-10"></TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <Suspense fallback={<LoadingListTableItem nr_cols={columns.length + 1} nr_rows={3}></LoadingListTableItem>}>
            <RenderItems getItems={getItems} cols={columns.length}></RenderItems>
          </Suspense>
        </TableBody>
      </Table>
    </Card>
  );
}
