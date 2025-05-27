import { fetchWrapper } from "@/app/_global/helpers/fetchWrapper";

export async function deleteFamilyMember(
  id: number,
  setLoading: (loading: boolean) => void,
  showAlert: (variant: string, message: string) => void,
  fetchFamilyMembers: () => void
) {
  const { data, error } = await fetchWrapper(
    `${process.env.NEXT_PUBLIC_REST_API_URL}/family-member/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );
  if (data) {
    await fetchFamilyMembers();
    showAlert("success", "Family member deleted successfully");
  } else {
    showAlert("danger", error?.message ?? "Family member deletion failed");
  }
  setLoading(false);
}
