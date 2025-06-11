import { fetchWrapper } from '@/app/_global/helpers/fetchWrapper';
import { validateSendResetPasswordEmail } from './sendResetPasswordEmail.validation';
import { redirect } from 'next/navigation';

/**
 * Send a reset password email
 * @param formData - The form data
 * @param showAlert - The function to show an alert
 * @param setFormErrors - The function to set the form errors
 * @param formErrorsState - The form errors state
 * @param setLoading - The function to set the loading state
 */
export async function sendResetPasswordEmail(
  formData: FormData,
  showAlert: (variant: string, message: string) => void,
  setFormErrors: (formErrors: Record<string, boolean>) => void,
  formErrorsState: Record<string, boolean>,
  setLoading: (loading: boolean) => void,
): Promise<void> {
  const email = formData.get('email');
  const payload = { email };
  const { formErrors, isValid } = validateSendResetPasswordEmail(payload);
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
    `${process.env.NEXT_PUBLIC_REST_API_URL}/users/send-reset-password-email?email=${encodeURIComponent(email as string)}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    },
  );
  if (data) {
    showAlert('success', 'Reset password email sent');
    redirect('/login');
  } else {
    showAlert('danger', error?.message ?? 'Reset password email not sent');
  }
  setLoading(false);
}
