import { auth, signOut } from "~/server/auth";
import { Button } from "../components/ui/button";
import { Sidebar, SidebarInset, SidebarTrigger } from "../components/ui/sidebar";

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

      <div className="flex flex-col items-center justify-center gap-4">
          
      </div>
    </main>
  );
}
