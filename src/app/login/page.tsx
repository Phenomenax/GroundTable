import { signIn, providerMap } from "~/server/auth";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { Button } from "../components/ui/button";
import Image from "next/image";

const SIGNIN_ERROR_URL = "/error";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl">Welcome to Joe&apos;s Airtable Clone</h1>
      <div className="mt-8 flex flex-col items-center justify-center gap-4 rounded-lg border-2 bg-white p-8 shadow-md">
        <h2 className="text-2xl">Sign in with Google to continue</h2>
        {Object.values(providerMap).map((provider) => (
          <form
            key={provider.id}
            action={async () => {
              "use server";
              try {
                await signIn(provider.id, {
                  redirectTo: "/home",
                });
              } catch (error) {
                // Signin can fail for a number of reasons, such as the user
                // not existing, or the user not having the correct role.
                // In some cases, you may want to redirect to a custom error
                if (error instanceof AuthError) {
                  return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
                }

                // Otherwise if a redirects happens Next.js can handle it
                // so you can just re-thrown the error and let Next.js handle it.
                // Docs:
                // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
                throw error;
              }
            }}
          >
            <Button type="submit" className="h-20 w-60" variant="link">
              <Image
                src="/google.svg"
                alt="Google Signin"
                width={500}
                height={500}
                className="transition-transform hover:scale-101"
              />
            </Button>
          </form>
        ))}
      </div>
    </main>
  );
}
