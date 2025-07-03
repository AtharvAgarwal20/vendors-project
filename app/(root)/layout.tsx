import React from "react";
import Navbar from "../components/Navbar/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}
