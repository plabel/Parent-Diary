"use client";
import LogEntries from "../_log-entry/log-entries";
import AppHeader from "../_global/app-header";

export default function HomePage() {
  return (
    <>
      <AppHeader activeLink="home" />
      <main className={`w-100 m-auto mt-1`}>
        <div className="container pt-5">
          <LogEntries />
        </div>
      </main>
    </>
  );
}
