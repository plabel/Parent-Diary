"use client";
import { useState, useEffect } from "react";
import { verifySession } from "../_global/helpers/verifySession";

export default function LogIn() {
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    const fetchUserId = async () => {
      const userId = await verifySession();
      setUserId(userId);
    };
    fetchUserId();
  }, []);
  return (
    <main className={`centered-main w-100 m-auto`}>
      {userId === null ? "..." : `Hello ${userId}`}
    </main>
  );
}
