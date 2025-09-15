"use client";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../../components/ui/button";
import { SidebarTrigger } from "~/app/components/ui/sidebar";

export default function HomeHeader() {
  const session = useSession();

  return (
    <div className="flex h-12 w-full items-center justify-between border-b p-4 shadow-xs">
      <div className="flex gap-4">
        <SidebarTrigger />
        <h1 className="text-xl font-bold">Airtable</h1>
      </div>

      <p>Logged in as {session?.data?.user?.email}</p>

      <Button
        size="lg"
        onClick={() => signOut({ redirectTo: "/login" })}
      >
        Sign out
      </Button>
    </div>
  );
}
