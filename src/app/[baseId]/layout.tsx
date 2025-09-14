import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
} from "~/app/components/ui/sidebar";
import { ArrowLeft } from "lucide-react";
import { Button } from "~/app/components/ui/button";
import Link from "next/link";

export default function BasePageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider defaultOpen={false}>
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
        <main className="flex-1">{children}</main>
      </div>
    </SidebarProvider>
  );
}
