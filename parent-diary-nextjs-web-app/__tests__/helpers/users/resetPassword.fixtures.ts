type ResetPasswordTestCase = {
  description: string;
  token: string;
  showAlertArgs: [string, string];
  fetchWrapperMockResult: {
    data: boolean | null;
    error: {
      message: string;
    } | null;
  };
  formData: FormData;
};

export const testCases: ResetPasswordTestCase[] = [
  {
    description: "should reset password",
    token: "1234567890",
    showAlertArgs: ["success", "Password reset successful"],
    fetchWrapperMockResult: {
      data: true,
      error: null,
    },
    formData: (() => {
      const formData = new FormData();
      formData.set("password", "Password123!");
      formData.set("confirmPassword", "Password123!");
      return formData;
    })(),
  },
  {
    description: "should not reset password, if fetchWrapper returns an error",
    token: "1234567890",
    showAlertArgs: ["danger", "Password reset failed"],
    fetchWrapperMockResult: {
      data: false,
      error: {
        message: "Password reset failed",
      },
    },
    formData: (() => {
      const formData = new FormData();
      formData.set("password", "Password123!");
      formData.set("confirmPassword", "Password123!");
      return formData;
    })(),
  },
];
