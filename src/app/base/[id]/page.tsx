import { Button } from "~/app/components/ui/button";
import { Sidebar, SidebarHeader } from "~/app/components/ui/sidebar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function BasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <Link href="/home" className="flex items-center justify-center">
            <Button variant="link">
              <ArrowLeft />
            </Button>
          </Link>
        </SidebarHeader>
      </Sidebar>

      <main className="flex-1">
        <div className="flex h-16 w-full items-center justify-between border-b p-4 shadow-xs">
          Base ID: {id}
        </div>
        <div className="bg-tablebg flex h-10 w-full border-b p-4 shadow-xs"></div>
      </main>
    </div>
  );
}
