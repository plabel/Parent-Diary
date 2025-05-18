import { fetchWrapper } from "@/app/_global/helpers/fetchWrapper";
import { redirect } from "next/navigation";

export async function submitLogOut(
  showAlert: (variant: string, message: string) => void
): Promise<void> {
  const { data, error } = await fetchWrapper<boolean>(
    `${process.env.NEXT_PUBLIC_REST_API_URL}/users/log-out`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  if (data) {
    showAlert("success", "Log out successful");
    redirect("/login");
  } else {
    showAlert("danger", error?.message ?? "Log out failed");
  }
}
