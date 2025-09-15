import { api } from "~/trpc/react";
import { columns, type Payment } from "./columns";
import { DataTable } from "./dataTable";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from "~/app/components/ui/sidebar";
import { Button } from "~/app/components/ui/button";
import { Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/app/components/ui/dropdown-menu";

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
    <div className="flex h-full w-full flex-col">
      <div className="flex h-16 w-full items-center gap-4 border-b p-4 shadow-xs">
        <SidebarTrigger />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="lg">
              Grid View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Rename View</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete View</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-1">
        <Sidebar collapsible="offcanvas">
          <SidebarContent>
            <SidebarMenu className="p-2">
              <SidebarMenuItem>
                <Button variant="link">
                  <Plus />
                  Create new...
                </Button>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
