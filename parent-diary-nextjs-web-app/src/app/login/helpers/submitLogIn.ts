import { fetchWrapper } from "@/app/_global/helpers/fetchWrapper";
import { validateLogin } from "./login.validation";

export async function submitLogIn(
  formData: FormData,
  showAlert: (variant: string, message: string) => void,
  setFormErrors: (formErrors: Record<string, boolean>) => void,
  formErrorsState: Record<string, boolean>,
  setLoading: (loading: boolean) => void
): Promise<void> {
  const email = formData.get("email");
  const password = formData.get("password");
  const payload = { email, password };
  const { formErrors, isValid } = validateLogin(payload);
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
    `${process.env.NEXT_PUBLIC_REST_API_URL}/users/log-in`,
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
      "Log in successful"
    );
  } else {
    showAlert("danger", error?.message ?? "Log in failed");
  }
  setLoading(false);
}