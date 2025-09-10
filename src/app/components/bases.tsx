"use client";
import { api } from "~/trpc/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

export function Bases() {
  const [bases] = api.base.getById.useSuspenseQuery();

  const utils = api.useUtils();
  const createBase = api.base.create.useMutation({
    onSuccess: async () => {
      await utils.base.invalidate();
    },
  });

  return (
    <div>
      <Button
        variant="outline"
        className="w-30"
        onClick={async () => {
          createBase.mutate();
        }}
      >
        Create Base
      </Button>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {bases.map((base) => (
          <Card key={base.id}>{base.name}</Card>
        ))}
      </div>
    </div>
  );
}
