import { redirect } from "next/navigation";
import { fetchWrapper } from "./fetchWrapper";

export async function verifySession() {
  const { data, error } = await fetchWrapper<boolean>(
    `${process.env.NEXT_PUBLIC_REST_API_URL}/users/current-user`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  if (data && data.userId && error === undefined) {
    return data.userId;
  } else {
    redirect("/login");
  }
}
