import { auth, signIn, signOut } from "@/auth";
import Link from "next/link";

import styles from "./navbar.module.scss";

const Navbar = async () => {
  const session = await auth();
  console.log(session);
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
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
