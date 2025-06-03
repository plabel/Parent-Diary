import { fetchWrapper } from "@/app/_global/helpers/fetchWrapper";

/**
 * Confirm a user's email
 * @param token - The token to confirm the email
 * @param setIsConfirmed - The function to set the is confirmed state
 * @param showAlert - The function to show an alert
 * @param setOtpAuthUrl - The function to set the OTP key URI
 */
export const confirmEmail = async (
  token: string,
  setIsConfirmed: (isConfirmed: boolean) => void,
  showAlert: (variant: string, message: string) => void,
  setOtpAuthUrl: (otpAuthUrl: string) => void
): Promise<void> => {
  const { data, error } = await fetchWrapper<string>(
    `${process.env.NEXT_PUBLIC_REST_API_URL}/users/confirm-email?token=${token}`,
    {
      method: "GET",
    }
  );
  if (data) {
    setIsConfirmed(true);
    setOtpAuthUrl(data);
  } else {
    showAlert("danger", error?.message ?? "Error confirming email");
  }
};
