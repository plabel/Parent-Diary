import { fetchWrapper } from '@/app/_global/helpers/fetchWrapper';
import { redirect } from 'next/navigation';

/**
 * Delete a user
 * @param showAlert - The function to show an alert
 */
export async function deleteUser(
  showAlert: (variant: string, message: string) => void,
): Promise<void> {
  const { data, error } = await fetchWrapper<boolean>(
    `${process.env.NEXT_PUBLIC_REST_API_URL}/users/current-user`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    },
  );
  if (data) {
    showAlert('success', 'User deleted successfully');
    redirect('/signin');
  } else {
    showAlert('danger', error?.message ?? 'User deletion failed');
  }
}
