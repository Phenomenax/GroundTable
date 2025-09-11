"use client";
import { api } from "~/trpc/react";
import { Card, CardAction, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function Bases() {
  const router = useRouter();
  const [bases] = api.base.getByUserId.useSuspenseQuery();

  const utils = api.useUtils();

  const createBase = api.base.create.useMutation({
    onSuccess: async (base) => {
      await utils.base.getByUserId.invalidate();
      router.replace(`/base/${base?.id}`);
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
            router.push("/base");
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
