import { auth, signOut } from "~/server/auth";
import { Button } from "../components/ui/button";
import { Sidebar, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger } from "../components/ui/sidebar";
import { Home as HomeIcon, Star as StarIcon, ExternalLink as ShareIcon, Users as WorkspaceIcon } from "lucide-react";

const items = [
  {
    title: "Home",
    url: "#",
    icon: HomeIcon,
  },
  {
    title: "Starred",
    url: "#",
    icon: StarIcon,
  },
  {
    title: "Shared",
    url: "#",
    icon: ShareIcon,
  },
  {
    title: "Workspaces",
    url: "#",
    icon: WorkspaceIcon,
  },
]

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex w-full min-h-screen flex-col items-center">
      <div className="flex justify-between items-center p-4 h-12 w-full border-b shadow-xs">
        <div className="flex gap-4">
          <SidebarTrigger />
          <h1 className="text-xl font-bold">Airtable</h1>
        </div>

        <p>Logged in as {session?.user.email}</p>

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <Button size={"lg"} type="submit">
            Sign out
          </Button>
        </form>
      </div>
      
      <div className="flex w-full h-full gap-4 border-r shadow-xs bg-airtable">
        <Sidebar side="left" collapsible="icon">
          <SidebarContent className="p-2">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter />
        </Sidebar>

        <div className="flex flex-1 flex-col p-8">
          <h2 className="text-3xl font-bold mb-4">Home</h2>
          <p className="mb-4">Open Anytime</p>
          <div className="flex flex-col items-center justify-center flex-1 gap-2">
            <h3 className="text-2xl">You haven&apos;t opened anything recently</h3>
            <p className="text-sm">Apps that you have recently opened will appear here.</p>
            <Button variant="outline" size="lg" className="mt-3">Go to all workspaces</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
