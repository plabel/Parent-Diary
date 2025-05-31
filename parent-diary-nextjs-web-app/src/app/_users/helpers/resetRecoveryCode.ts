import { fetchWrapper } from "@/app/_global/helpers/fetchWrapper";

export async function resetRecoveryCode(
  showAlert: (variant: string, message: string) => void
): Promise<void> {
  const { data, error } = await fetchWrapper<boolean>(
    `${process.env.NEXT_PUBLIC_REST_API_URL}/users/reset-recovery-code`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  if (data) {
    showAlert("success", "Recovery code reset successfully. Please check your email for the new recovery code.");
  } else {
    showAlert("danger", error?.message ?? "Recovery code reset failed");
  }
}
