export type ValidateSendResetPasswordEmailTestCase = {
  description: string;
  input: unknown;
  expected: {
    formErrors: Record<string, boolean>;
    isValid: boolean;
  };
};

export const testCases: ValidateSendResetPasswordEmailTestCase[] = [
  {
    description: 'should validate send reset password email',
    input: {
      email: 'test@test.com',
    },
    expected: {
      formErrors: {
        email: false,
      },
      isValid: true,
    },
  },
  {
    description:
      'should not validate send reset password email, if email is not valid',
    input: {
      email: 'test',
    },
    expected: {
      formErrors: {
        email: true,
      },
      isValid: false,
    },
  },
];
