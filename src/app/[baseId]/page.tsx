import { api } from "~/trpc/server";

export default async function BasePage({
  params,
}: {
  params: Promise<{ baseId: string }>;
}) {
  const { baseId } = await params;
  const base = await api.base.getByBaseId(baseId);

  return (
    <div>
      <div className="flex h-16 w-full items-center justify-between border-b p-4 shadow-xs">
        {base?.name}
      </div>
      <div className="bg-tablebg flex h-10 w-full border-b p-4 shadow-xs"></div>
    </div>
  );
}
