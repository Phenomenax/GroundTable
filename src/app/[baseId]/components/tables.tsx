import { api } from "~/trpc/react";
import { columns, type Payment } from "./columns";
import { DataTable } from "./dataTable";

function getData(): Payment[] {
  // Fetch data from your API here.
  return [
    {
      name: "",
      notes: "",
      assignee: "",
      status: "",
      attachment: "",
    },
    {
      name: "",
      notes: "",
      assignee: "",
      status: "",
      attachment: "",
    },
    {
      name: "",
      notes: "",
      assignee: "",
      status: "",
      attachment: "",
    },
    {
      name: "",
      notes: "",
      assignee: "",
      status: "",
      attachment: "",
    },
    {
      name: "",
      notes: "",
      assignee: "",
      status: "",
      attachment: "",
    },
    // ...
  ];
}
export function TableView({ tableId }: { tableId: string }) {
  const data = getData();

  const [table] = api.table.getByTableId.useSuspenseQuery(tableId);
  return (
    <div className="container">
      <div>Table chosen: {table.name}</div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
