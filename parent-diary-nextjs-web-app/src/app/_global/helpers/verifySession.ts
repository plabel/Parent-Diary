import { redirect } from 'next/navigation';
import { fetchWrapper } from './fetchWrapper';

/**
 * Verify the session
 * @returns The user ID if the session is valid, otherwise redirects to the login page
 */
export async function verifySession() {
  const { data, error } = await fetchWrapper<{ userId: string }>(
    `${process.env.NEXT_PUBLIC_REST_API_URL}/users/current-user`,
    {
      method: 'GET',
      credentials: 'include',
    },
  );
  if (data && data.userId && error === undefined) {
    return data.userId;
  } else {
    redirect('/login');
  }
}
