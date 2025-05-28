import { redirect } from "next/navigation";
import { fetchWrapper } from "../../_global/helpers/fetchWrapper";
import { validateLogEntry } from "./log-entry.validation";

export default async function createLogEntry(
  formData: FormData,
  showAlert: (variant: string, message: string) => void,
  setFormErrors: (formErrors: Record<string, boolean>) => void,
  formErrorsState: Record<string, boolean>,
  setLoading: (loading: boolean) => void
): Promise<void> {
  const entry = formData.get("entry");
  const familyMembers = formData.getAll("familyMembers");
  const payload = { entry, familyMembers };
  const { formErrors, isValid } = validateLogEntry(payload);
  const updatedFormErrors = {
    ...formErrorsState,
    ...formErrors,
  };
  setFormErrors(updatedFormErrors);
  if (!isValid) {
    setLoading(false);
    return;
  }

  const { data, error } = await fetchWrapper<boolean>(
    `${process.env.NEXT_PUBLIC_REST_API_URL}/log-entry`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      credentials: "include",
    }
  );
  if (data) {
    showAlert("success", "Log entry created successfully");
    redirect("/home");
  } else {
    showAlert("danger", error?.message ?? "Log entry creation failed");
  }
  setLoading(false);
}
