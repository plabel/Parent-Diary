import { redirect } from 'next/navigation';
import { fetchWrapper } from '../../_global/helpers/fetchWrapper';
import { validateFamilyMember } from './family-member.validation';

/**
 * Create a family member
 * @param formData - The form data
 * @param showAlert - The function to show an alert
 * @param setFormErrors - The function to set the form errors
 * @param formErrorsState - The form errors state
 * @param setLoading - The function to set the loading state
 */
export default async function createFamilyMember(
  formData: FormData,
  showAlert: (variant: string, message: string) => void,
  setFormErrors: (formErrors: Record<string, boolean>) => void,
  formErrorsState: Record<string, boolean>,
  setLoading: (loading: boolean) => void,
): Promise<void> {
  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const petName = formData.get('petName');
  const payload = { firstName, lastName, petName };
  const { formErrors, isValid } = validateFamilyMember(payload);
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
    `${process.env.NEXT_PUBLIC_REST_API_URL}/family-member`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      credentials: 'include',
    },
  );
  if (data) {
    showAlert('success', 'Family member created successfully');
    redirect('/family-members');
  } else {
    showAlert('danger', error?.message ?? 'Family member creation failed');
  }
  setLoading(false);
}
