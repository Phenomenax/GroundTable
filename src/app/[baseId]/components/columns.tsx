"use client";

import { type ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  name: string;
  notes: string;
  assignee: string;
  status: string;
  attachment: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
  {
    accessorKey: "assignee",
    header: "Assignee",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "attachment",
    header: "Attachment",
  },
];
