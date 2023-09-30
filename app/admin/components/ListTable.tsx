import { Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@tremor/react";
import { Suspense } from "react";
import LoadingListTableItem from "./ListTableLoading";
import ListTableItem from "./ListTableItem";

interface ActionButton {
  name: string;
  icon: React.ReactNode;
  // handler: () => void;
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
}

const RenderItems = async ({ getItems }: ContentProps) => (await getItems()).map(item => (
  <ListTableItem item={item} key={item.data[0]}></ListTableItem>
));

export default function ListTable({ columns, getItems }: Props) {
  return (
    <Card className="py-4">  
      <Table>
        <TableHead>
          <TableRow>
            {columns.map(col => (
              <TableHeaderCell key={col}>{col}</TableHeaderCell>
            ))}
            <TableHeaderCell className="w-10"></TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <Suspense fallback={<LoadingListTableItem nr_cols={columns.length + 1} nr_rows={3}></LoadingListTableItem>}>
            <RenderItems getItems={getItems}></RenderItems>
          </Suspense>
        </TableBody>
      </Table>
    </Card>
  );
}
