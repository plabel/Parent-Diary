import { fetchWrapper } from "@/app/_global/helpers/fetchWrapper";


export async function submitSignIn(formData: FormData, showAlert: (variant: string, message: string) => void) {
  const email = formData.get("email");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const password = formData.get("password");
  const response = await fetchWrapper<boolean>(
    `${process.env.NEXT_PUBLIC_REST_API_URL}/users/sign-in`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, firstName, lastName, password }),
    }
  );
  if (response) {
    showAlert("success", "Sign in successful, please check your email for a confirmation link");
  } else {
    showAlert("danger", "Sign in failed");
  }
}
