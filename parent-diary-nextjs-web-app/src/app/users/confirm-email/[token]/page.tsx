"use client";
import { useAlert } from "@/app/_global/alert/alert-provider";
import Link from "next/link";
import { Usable, useEffect, useState, use } from "react";
import { confirmEmail } from "./helpers/confirmEmail";

type ConfirmEmailProps = {
  params: Usable<{
    token: string;
  }>;
};

export default function ConfirmEmail({ params }: ConfirmEmailProps) {
  const showAlert = useAlert();
  const token = use(params).token;
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    confirmEmail(token, setIsConfirmed, showAlert);
  }, []);

  return (
    <main className={"centered-main w-100 m-auto"}>
      {isConfirmed ? (
        <h3>
          Email confirmed <Link href="/login">Log in</Link>
        </h3>
      ) : (
        <h3>Loading...</h3>
      )}
    </main>
  );
}
