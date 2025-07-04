import React from "react";
import Navbar from "../components/Navbar/Navbar";

import styles from "./root.module.scss";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.wrapper}>
      <Navbar />
      {children}
    </main>
  );
}
