import { fetchWrapper } from '@/app/_global/helpers/fetchWrapper';
import { sendResetPasswordEmail } from '@/app/users/send-reset-password-email/helpers/sendResetPasswordEmail';
import { testCases } from './sendResetPasswordEmail.fixtures';

jest.mock('@/app/_global/helpers/fetchWrapper', () => ({
  fetchWrapper: jest.fn(),
}));
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

describe('sendResetPasswordEmail', () => {
  test.each(testCases)(
    '$description',
    async ({ showAlertArgs, formData, fetchWrapperMockResult }) => {
      (fetchWrapper as jest.Mock).mockResolvedValueOnce(fetchWrapperMockResult);
      const showAlertFn = jest.fn();
      const setFormErrorsFn = jest.fn();
      const formErrorsState = {
        password: false,
        confirmPassword: false,
      };
      const setLoadingFn = jest.fn();
      await sendResetPasswordEmail(
        formData,
        showAlertFn,
        setFormErrorsFn,
        formErrorsState,
        setLoadingFn,
      );
      expect(showAlertFn).toHaveBeenCalledWith(...showAlertArgs);
    },
  );
});
