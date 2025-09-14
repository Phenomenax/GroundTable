"use client";
import { api } from "~/trpc/react";

export function TableView({ tableId }: { tableId: string }) {
  const [table] = api.table.getByTableId.useSuspenseQuery(tableId);

  return <div>Table chosen: {table.name}</div>;
}
