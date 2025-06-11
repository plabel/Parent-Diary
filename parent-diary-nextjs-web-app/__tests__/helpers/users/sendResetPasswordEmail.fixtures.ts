type SendResetPasswordEmailTestCase = {
  description: string;
  showAlertArgs: [string, string];
  fetchWrapperMockResult: {
    data: boolean | null;
    error: {
      message: string;
    } | null;
  };
  formData: FormData;
};

export const testCases: SendResetPasswordEmailTestCase[] = [
  {
    description: 'should send reset password email',
    showAlertArgs: ['success', 'Reset password email sent'],
    fetchWrapperMockResult: { data: true, error: null },
    formData: (() => {
      const formData = new FormData();
      formData.set('email', 'test@test.com');
      return formData;
    })(),
  },
  {
    description:
      'should not send reset password email, if fetchWrapper returns an error',
    showAlertArgs: ['danger', 'Reset password email failed'],
    fetchWrapperMockResult: {
      data: false,
      error: { message: 'Reset password email failed' },
    },
    formData: (() => {
      const formData = new FormData();
      formData.set('email', 'test@test.com');
      return formData;
    })(),
  },
];
