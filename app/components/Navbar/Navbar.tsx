import { auth, signIn, signOut } from "@/auth";
import Link from "next/link";

import styles from "./navbar.module.scss";

const Navbar = async () => {
  const session = await auth();

  const signOutHandler = async () => {
    "use server";
    await signOut({ redirectTo: "/" });
  };

  const signInHandler = async () => {
    "use server";
    await signIn("google");
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Link href={"/"}>Home</Link>
        <div>
          {session && session?.user ? (
            <>
              <Link href="/vendors/create">Create Vendor</Link>
              <Link href="/vendors/my-vendors">My Vendors</Link>
              <form action={signOutHandler}>
                <button type="submit">Logout</button>
              </form>
            </>
          ) : (
            <form action={signInHandler}>
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
