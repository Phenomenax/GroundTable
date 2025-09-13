export default async function Table({
  params,
}: {
  params: Promise<{ tableId: string }>;
}) {
  const { tableId } = await params;

  return <>{tableId}</>;
}
