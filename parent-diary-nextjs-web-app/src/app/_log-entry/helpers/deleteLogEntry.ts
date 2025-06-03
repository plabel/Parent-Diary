import { fetchWrapper } from "@/app/_global/helpers/fetchWrapper";

/**
 * Delete a log entry
 * @param id - The ID of the log entry to delete
 * @param setLoading - The function to set the loading state
 * @param showAlert - The function to show an alert
 * @param fetchLogEntries - The function to fetch the log entries
 */
export async function deleteLogEntry(
  id: number,
  setLoading: (loading: boolean) => void,
  showAlert: (variant: string, message: string) => void,
  fetchLogEntries: () => void
) {
  const { data, error } = await fetchWrapper(
    `${process.env.NEXT_PUBLIC_REST_API_URL}/log-entry/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );
  if (data) {
    await fetchLogEntries();
    showAlert("success", "Log entry deleted successfully");
  } else {
    showAlert("danger", error?.message ?? "Log entry deletion failed");
  }
  setLoading(false);
}
