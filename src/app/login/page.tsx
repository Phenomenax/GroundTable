import Link from "next/link";

export default async function Home() {
  return (
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
  );
}
