"use client";
import { useAlert } from "@/app/_global/alert/alert-provider";
import { fetchWrapper } from "@/app/_global/helpers/fetchWrapper";
import Link from "next/link";
import { Usable, useEffect, useState, use } from "react";

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
    const confirmEmail = async () => {
      const {data, error} = await fetchWrapper<boolean>(
        `${process.env.NEXT_PUBLIC_REST_API_URL}/users/confirm-email?token=${token}`,
        {
          method: "GET",
        }
      );
      if (data === true) {
        setIsConfirmed(true);
      } else {
        showAlert("danger", error.message ?? "Error confirming email");
      }
    };
    confirmEmail();
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
