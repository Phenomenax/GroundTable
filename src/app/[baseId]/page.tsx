"use client";
import { api } from "~/trpc/react";
import { use, useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "../components/ui/pagination";

type Base = {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  tableCount: number;
};

export default function BasePage({
  params,
}: {
  params: Promise<{ baseId: string }>;
}) {
  const { baseId } = use(params);
  const { data: base, isLoading: baseIsLoading } =
    api.base.getByBaseId.useQuery(baseId);
  const {
    data: tables,
    isLoading: tablesIsLoading,
    isSuccess: tableIsLoaded,
  } = api.table.getByBaseId.useQuery(baseId);

  const [activeTableId, setActiveTableId] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    if (tableIsLoaded && tables.length > 0 && !activeTableId) {
      setActiveTableId(tables[0]?.id);
    }
  }, [tableIsLoaded]);

  const utils = api.useUtils();
  const createTable = api.table.createByBaseId.useMutation();

  return (
    <div>
      <div className="flex h-16 w-full items-center justify-between border-b p-4 shadow-xs">
        {baseIsLoading ? "Loading..." : base?.name}
        <Button
          variant="outline"
          size="lg"
          onClick={async () => {
            if (!base) return;
            createTable.mutate(base.id, {
              onSuccess: () => {
                void utils.table.getByBaseId.invalidate(base.id);
              },
            });
          }}
        >
          Create Table
        </Button>
      </div>
      {/* <div className="bg-tablebg flex items-center h-10 w-full border-b shadow-xs">
        {tables?.map((table) => (
          <Button key={table.id} size="lg" className= "h-full" variant="outline">
            {table.name}
          </Button>
        ))}
      </div> */}
      <Pagination className="bg-tablebg h-10 w-full items-center border-b shadow-xs">
        <PaginationContent>
          {tables?.map((table) => (
            <PaginationItem key={table.id}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTableId(table.id);
                }}
                isActive={activeTableId === table.id}
                size="lg"
              >
                {table.name}
              </PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>
      <div>
        {activeTableId ? (
          <div>
            Table chosen: {tables?.find((t) => t.id === activeTableId)?.name}
          </div>
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  );
}
