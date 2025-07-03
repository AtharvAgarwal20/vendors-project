import { auth, signIn, signOut } from "@/auth";
import Link from "next/link";

const Navbar = async () => {
  const session = await auth();
  return (
    <header>
      <nav>
        <Link href={"/"}>Home</Link>
        <div>
          {session && session?.user ? (
            <>
              <Link href="/vendor/create">Create Vendor</Link>
              <Link href={`/user/${session.user?.id}`}>My Vendors</Link>
              <form
                action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">Logout</button>
              </form>
              <span>{session.user.name}</span>
            </>
          ) : (
            <form
              action={async () => {
                "use server";

                await signIn("google");
              }}
            >
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
