import { auth } from "@/auth";

import Image from "next/image";
import styles from "./root.module.scss";

export default async function Home() {
  const session = await auth();
  return (
    <main className={styles.container}>
      {!session && <h1>Login to continue</h1>}
      {session && session.user?.image && (
        <div className={styles.profileBlock}>
          <h1>Welcome</h1>
          <Image
            src={session.user?.image}
            height={130}
            width={130}
            alt="User profile image"
            className={styles.pfp}
          />
          <p className={styles.name}>{session.user.name}</p>
          <p className={styles.email}>{session.user.email}</p>
        </div>
      )}
    </main>
  );
}
