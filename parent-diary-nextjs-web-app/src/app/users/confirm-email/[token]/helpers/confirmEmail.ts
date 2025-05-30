import { fetchWrapper } from "@/app/_global/helpers/fetchWrapper";

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
