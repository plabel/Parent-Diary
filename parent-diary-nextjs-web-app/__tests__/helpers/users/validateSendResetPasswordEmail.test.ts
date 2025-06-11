import { validateSendResetPasswordEmail } from '@/app/users/send-reset-password-email/helpers/sendResetPasswordEmail.validation';
import { testCases } from './validateSendResetPasswordEmail.fixtures';

describe('validateSendResetPasswordEmail', () => {
  test.each(testCases)('$description', ({ input, expected }) => {
    const result = validateSendResetPasswordEmail(input);
    expect(result).toEqual(expected);
  });
});
