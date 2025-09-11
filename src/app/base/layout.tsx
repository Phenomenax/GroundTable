import { SidebarProvider } from "~/app/components/ui/sidebar";

export default function BasePageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider defaultOpen={false}>
      {children}
    </SidebarProvider>
  );
}
