"use client";
import { api } from "~/trpc/react";
import { Card, CardAction, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

export function Bases() {
  const [bases] = api.base.getById.useSuspenseQuery();

  const utils = api.useUtils();
  
  const createBase = api.base.create.useMutation({
    onSuccess: async () => {
      await utils.base.getById.invalidate();
    },
  });
  const deleteBase = api.base.deleteById.useMutation({
    onSuccess: async () => {
      await utils.base.getById.invalidate();
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
          <Card key={base.id}>
            <CardTitle>
              {base.name}
            </CardTitle>
            <CardAction>
              <Button
                variant="outline"
                className="w-30"
                onClick={async () => {
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
