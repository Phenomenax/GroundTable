"use client";
import { api } from "~/trpc/react";
import { Card, CardAction, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function Bases() {
  const router = useRouter();
  const [bases] = api.base.getByUserId.useSuspenseQuery();

  const utils = api.useUtils();

  const createTable = api.table.createByBaseId.useMutation();

  const createBase = api.base.create.useMutation({
    onSuccess: async (base) => {
      router.push(`/${base.id}`);

      console.log("Creating initial table for base:", base.id);

      const table = await createTable.mutateAsync(base.id);

      console.log("Created initial table:", table.id);

      router.push(`/${base.id}/${table.id}`);

      await utils.base.getByUserId.invalidate();
      await utils.base.getByUserId.fetch();
    },
  });
  const deleteBase = api.base.deleteById.useMutation({
    onSuccess: async () => {
      await utils.base.getByUserId.invalidate();
    },
  });

  return (
    <div>
      <Button
        variant="outline"
        className="w-30"
        onClick={() => {
          createBase.mutate();
        }}
      >
        Create Base
      </Button>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {bases.map((base) => (
          <Card
            key={base.id}
            className="flex-row items-center justify-between px-8"
          >
            {/* The Link and button structure needs to be changed */}
            <Link key={base.id} href={`/${base.id}`}>
              <CardTitle>{base.name}</CardTitle>
            </Link>
            <CardAction>
              <Button
                variant="outline"
                className="w-30"
                onClick={() => {
                  deleteBase.mutate(base.id);
                }}
              >
                Delete Base
              </Button>
            </CardAction>
          </Card>
        ))}
      </div>
    </div>
  );
}
