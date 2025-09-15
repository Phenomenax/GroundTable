import { auth } from "~/server/auth";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../components/ui/sidebar";
import items from "~/app/constants/sidebarItems";
import { api, HydrateClient } from "~/trpc/server";
import { Bases } from "./components/bases";
import HomeHeader from "./components/homeHeader";
import { SessionProvider } from "next-auth/react";

export default async function HomePage() {
  const session = await auth();

  if (session?.user) {
    void api.base.getByUserId.prefetch();
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen w-full flex-col items-center">
        <SessionProvider>
          <HomeHeader />
        </SessionProvider>

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
