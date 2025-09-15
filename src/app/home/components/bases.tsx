"use client";
import { api } from "~/trpc/react";
import { Card, CardAction, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function Bases() {
  const router = useRouter();
  const [bases] = api.base.getByUserId.useSuspenseQuery();
  const createTable = api.table.createByBaseId.useMutation();

  const utils = api.useUtils();

  const createBase = api.base.create.useMutation({
    onSuccess: async (base) => {
      await createTable.mutateAsync(base.id);
      router.push(`/${base.id}`);
      await utils.base.getByUserId.invalidate();
    },
  });
  const deleteBase = api.base.deleteById.useMutation({
    onMutate: async (base) => {
      await utils.base.getByUserId.cancel();
      const previousBases = utils.base.getByUserId.getData();
      utils.base.getByUserId.setData(undefined, (old) =>
        old?.filter((b) => b.id !== base),
      );
      return { previousBases };
    },
    onError: (err, newPost, ctx) => {
      // If the mutation fails, use the context-value from onMutate
      utils.base.getByUserId.setData(undefined, ctx?.previousBases);
    },
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
