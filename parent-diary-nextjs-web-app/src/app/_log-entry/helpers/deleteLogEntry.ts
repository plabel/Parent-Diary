import { fetchWrapper } from "@/app/_global/helpers/fetchWrapper";

export async function deleteLogEntry(
  id: string,
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
    showAlert("success", "Log entry deleted successfully");
    fetchLogEntries();
  } else {
    showAlert("danger", error?.message ?? "Log entry deletion failed");
  }
  setLoading(false);
}
