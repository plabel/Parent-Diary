import { fetchWrapper } from "@/app/_global/helpers/fetchWrapper";
import { validateResetPassword } from "./resetPassword.validation";
import { redirect } from "next/navigation";

/**
 * Reset a user's password
 * @param formData - The form data
 * @param token - The token to reset the password
 * @param showAlert - The function to show an alert
 * @param setFormErrors - The function to set the form errors
 */
export async function resetPassword(
    formData: FormData,
    token: string,
    showAlert: (variant: string, message: string) => void,
    setFormErrors: (formErrors: Record<string, boolean>) => void,
    formErrorsState: Record<string, boolean>,
    setLoading: (loading: boolean) => void
  ): Promise<void> {
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const payload = { password, confirmPassword, token };
    const { formErrors, isValid } = validateResetPassword(payload);
    const updatedFormErrors = {
      ...formErrorsState,
      ...formErrors,
    };
    setFormErrors(updatedFormErrors);
    if (!isValid) {
      setLoading(false);
      return;
    }
  
    const {data, error} = await fetchWrapper<boolean>(
      `${process.env.NEXT_PUBLIC_REST_API_URL}/users/reset-password?token=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: 'include'
      }
    );
    if (data) {
      showAlert(
        "success",
        "Password reset successful"
      );
      redirect("/login");
    } else {
      showAlert("danger", error?.message ?? "Password reset failed");
    }
    setLoading(false);
  }