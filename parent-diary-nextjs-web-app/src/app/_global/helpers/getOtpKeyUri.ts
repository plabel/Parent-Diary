import { Dispatch, SetStateAction } from 'react';
import { fetchWrapper } from './fetchWrapper';

/**
 * Get the OTP key URI for a user
 * @param setOtpAuthUrl - The function to set the OTP key URI
 * @param showAlert - The function to show an alert
 */
export const getOtpKeyUri = async (
  setOtpAuthUrl: Dispatch<SetStateAction<string | null>>,
  showAlert: (variant: string, message: string) => void,
): Promise<void> => {
  const { data, error } = await fetchWrapper<string>(
    `${process.env.NEXT_PUBLIC_REST_API_URL}/users/otp-key-uri`,
    {
      method: 'GET',
      credentials: 'include',
    },
  );
  if (data) {
    setOtpAuthUrl(data);
  } else {
    showAlert('danger', error?.message ?? 'Error getting otp key uri');
  }
};
