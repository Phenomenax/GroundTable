import { Sidebar } from "~/app/components/ui/sidebar";

export default function BasePage() {
  return (
      <div className="flex min-h-screen w-full">
      <Sidebar collapsible="icon">
      </Sidebar>

      <main className="flex-1">
        <div className="flex h-16 w-full items-center justify-between border-b p-4 shadow-xs">
        </div>
        <div className="flex h-10 w-full border-b p-4 shadow-xs bg-tablebg">
        </div>
      </main>
    </div>
  );
}