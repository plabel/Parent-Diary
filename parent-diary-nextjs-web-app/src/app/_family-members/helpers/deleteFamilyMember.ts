import { fetchWrapper } from '@/app/_global/helpers/fetchWrapper';

/**
 * Delete a family member
 * @param id - The ID of the family member to delete
 * @param setLoading - The function to set the loading state
 * @param showAlert - The function to show an alert
 * @param fetchFamilyMembers - The function to fetch the family members
 */
export async function deleteFamilyMember(
  id: number,
  setLoading: (loading: boolean) => void,
  showAlert: (variant: string, message: string) => void,
  fetchFamilyMembers: () => void,
) {
  const { data, error } = await fetchWrapper(
    `${process.env.NEXT_PUBLIC_REST_API_URL}/family-member/${id}`,
    {
      method: 'DELETE',
      credentials: 'include',
    },
  );
  if (data) {
    await fetchFamilyMembers();
    showAlert('success', 'Family member deleted successfully');
  } else {
    showAlert('danger', error?.message ?? 'Family member deletion failed');
  }
  setLoading(false);
}
