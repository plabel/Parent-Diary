import { fetchWrapper } from "../../_global/helpers/fetchWrapper";
import { validateLogEntry } from "@/app/log-entry/helpers/log-entry.validation";

/**
 * Update a log entry
 * @param id - The ID of the log entry to update
 * @param formData - The form data
 * @param showAlert - The function to show an alert
 * @param setFormErrors - The function to set the form errors
 */
export default async function updateLogEntry(
  id: number,
  formData: FormData,
  showAlert: (variant: string, message: string) => void,
  setFormErrors: (formErrors: Record<string, boolean>) => void,
  formErrorsState: Record<string, boolean>,
  setLoading: (loading: boolean) => void,
  refreshLogEntries: () => Promise<void>,
  handleClose: () => void
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
    `${process.env.NEXT_PUBLIC_REST_API_URL}/log-entry/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      credentials: "include",
    }
  );
  if (data) {
    await refreshLogEntries();
    showAlert("success", "Log entry updated successfully");
    handleClose();
  } else {
    showAlert("danger", error?.message ?? "Log entry update failed");
  }
  setLoading(false);
}
