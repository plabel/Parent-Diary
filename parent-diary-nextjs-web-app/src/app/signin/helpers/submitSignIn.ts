import { fetchWrapper } from "@/app/_global/helpers/fetchWrapper";
import { validateSignin } from "./signin.validation";

export async function submitSignIn(
  formData: FormData,
  showAlert: (variant: string, message: string) => void,
  setFormErrors: (formErrors: Record<string, boolean>) => void,
  formErrorsState: Record<string, boolean>,
  setLoading: (loading: boolean) => void
): Promise<void> {
  const email = formData.get("email");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const password = formData.get("password");
  const payload = { email, firstName, lastName, password };
  const { formErrors, isValid } = validateSignin(payload);
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
    `${process.env.NEXT_PUBLIC_REST_API_URL}/users/sign-in`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );
  if (data) {
    showAlert(
      "success",
      "Sign in successful, please check your email for a confirmation link"
    );
  } else {
    showAlert("danger", error.message ?? "Sign in failed");
  }
  setLoading(false);
}
