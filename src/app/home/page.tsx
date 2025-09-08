import Link from "next/link";

import { auth } from "~/server/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <p>Logged in as {session?.user.email}</p>
        <Link
          href={"/api/auth/signout"}
          className="rounded-full bg-black text-white px-10 py-3 font-semibold no-underline transition hover:bg-black/90"
        >
          {"Sign out"}
        </Link>
      </div>
    </main>
  );
}
