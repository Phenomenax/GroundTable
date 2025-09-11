import { SidebarProvider } from "../components/ui/sidebar";

export default function HomePageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider defaultOpen={false}>
      {children}
    </SidebarProvider>
  );
}
