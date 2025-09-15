"use client";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../../components/ui/button";
import { SidebarTrigger } from "~/app/components/ui/sidebar";
import { useIsMutating } from "@tanstack/react-query";
import { Spinner } from "~/app/components/ui/spinner";

export default function HomeHeader() {
  const session = useSession();
  const mutatingCount = useIsMutating();
  const isSaving = mutatingCount > 0;

  return (
    <div className="flex h-12 w-full items-center justify-between border-b p-4 shadow-xs">
      <div className="flex gap-4">
        <SidebarTrigger />
        <h1 className="text-xl font-bold">Airtable</h1>
      </div>

      <p>Logged in as {session?.data?.user?.email}</p>

      {isSaving ? <Spinner /> : null}

      <Button
        size="lg"
        onClick={() => signOut({ redirectTo: "/login" })}
      >
        Sign out
      </Button>
    </div>
  );
}
