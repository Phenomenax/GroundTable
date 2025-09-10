import { auth, signOut } from "~/server/auth";
import { Button } from "../components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "../components/ui/sidebar";
import {
  Home as HomeIcon,
  Star as StarIcon,
  ExternalLink as ShareIcon,
  Users as WorkspaceIcon,
} from "lucide-react";
import { api, HydrateClient } from "~/trpc/server";
import { Bases } from "../components/bases";

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
];

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    void api.base.getById.prefetch();
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen w-full flex-col items-center">
        <div className="flex h-12 w-full items-center justify-between border-b p-4 shadow-xs">
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

        <div className="bg-airtable flex h-full w-full gap-4 border-r shadow-xs">
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
            <h2 className="mb-4 text-3xl font-bold">Home</h2>
            {/* <p className="mb-4">Open Anytime</p> */}
            {session?.user && <Bases />}
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
