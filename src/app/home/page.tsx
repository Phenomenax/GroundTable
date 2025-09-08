import { auth, signOut } from "~/server/auth";
import { Button } from "../components/ui/button";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <p>Logged in as {session?.user.email}</p>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <Button size={"lg"} type="submit">
            Sign out
          </Button>
        </form>
      </div>
    </main>
  );
}
