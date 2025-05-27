"use client";
import LogEntries from "../_log-entry/log-entries";
import AppHeader from "../_global/app-header";

export default function LogIn() {
  return (
    <>
      <AppHeader />
      <main className={`w-100 m-auto`}>
        <div className="container pt-5">
          <LogEntries />
        </div>
      </main>
    </>
  );
}
