type SubmitLogInTestCase = {
  description: string;
  fetchWrapperMockResult: {
    data: boolean | null;
    error: unknown | null;
  };
  showAlertNbOfCalls: number;
  showAlertArgs: [string, string];
  formData: FormData;
};

export const testCases: SubmitLogInTestCase[] = [
  {
    description: `
      Given a valid form data
      When the submitLogIn function is called
      Then the showAlert function is called with the correct arguments
    `,
    fetchWrapperMockResult: {
      data: true,
      error: null,
    },
    showAlertNbOfCalls: 1,
    showAlertArgs: [
      "success",
      "Log in successful",
    ],
    formData: (() => {
      const formData = new FormData();
      formData.set("email", "test@test.com");
      formData.set("password", "Password123!");
      formData.set("otp", "123456");
      formData.set("recoveryCode", "");
      return formData;
    })(),
  },
  {
    description: `
      Given a valid form data
      When the submitLogIn function is called but the fetchWrapper returns an error
      Then the showAlert function is called with the correct arguments
    `,
    fetchWrapperMockResult: {
      data: false,
      error: {
        message: "Log in failed",
      },
    },
    showAlertNbOfCalls: 1,
    showAlertArgs: [
      "danger",
      "Log in failed",
    ],
    formData: (() => {
      const formData = new FormData();
      formData.set("email", "test@test.com");
      formData.set("password", "Password123!");
      formData.set("otp", "123456");
      formData.set("recoveryCode", "");
      return formData;
    })(),
  },
  {
    description: `
      Given a valid form data ALT scenario
      When the submitLogIn function is called but the fetchWrapper returns an error
      Then the showAlert function is called with the correct arguments
    `,
    fetchWrapperMockResult: {
      data: false,
      error: {
      },
    },
    showAlertNbOfCalls: 1,
    showAlertArgs: [
      "danger",
      "Log in failed",
    ],
    formData: (() => {
      const formData = new FormData();
      formData.set("email", "test@test.com");
      formData.set("password", "Password123!");
      formData.set("otp", "123456");
      formData.set("recoveryCode", "");
      return formData;
    })(),
  },
  {
    description: `
      Given an invalid form data
      When the submitLogIn function is called
      Then the showAlert function is not called
    `,
    fetchWrapperMockResult: {
      data: true,
      error: null,
    },
    showAlertNbOfCalls: 0,
    showAlertArgs: [
      "",
      "",
    ],
    formData: (() => {
      const formData = new FormData();
      formData.set("email", "test@test.com");
      formData.set("password", "");
      return formData;
    })(),
  },
];
