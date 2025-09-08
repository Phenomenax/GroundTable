import Link from "next/link";

import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <Link
            href={"/api/auth/signin"}
            className="rounded-full bg-black text-white px-10 py-3 font-semibold no-underline transition hover:bg-black/90"
          >
            {"Sign in"}
          </Link>
        </div>
      </main>
    </HydrateClient>
  );
}
