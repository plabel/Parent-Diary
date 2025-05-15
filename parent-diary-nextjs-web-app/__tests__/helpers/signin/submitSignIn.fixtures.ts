type SubmitSignInTestCase = {
  description: string;
  fetchWrapperMockResult: {
    data: boolean | null;
    error: unknown | null;
  };
  showAlertNbOfCalls: number;
  showAlertArgs: [string, string];
  formData: FormData;
};

export const testCases: SubmitSignInTestCase[] = [
  {
    description: `
      Given a valid form data
      When the submitSignIn function is called
      Then the showAlert function is called with the correct arguments
    `,
    fetchWrapperMockResult: {
      data: true,
      error: null,
    },
    showAlertNbOfCalls: 1,
    showAlertArgs: [
      "success",
      "Sign in successful, please check your email for a confirmation link",
    ],
    formData: (() => {
      const formData = new FormData();
      formData.set("email", "test@test.com");
      formData.set("firstName", "Test");
      formData.set("lastName", "Test");
      formData.set("password", "Password123!");
      return formData;
    })(),
  },
  {
    description: `
      Given a valid form data
      When the submitSignIn function is called but the fetchWrapper returns an error
      Then the showAlert function is called with the correct arguments
    `,
    fetchWrapperMockResult: {
      data: false,
      error: {
        message: "Sign in failed",
      },
    },
    showAlertNbOfCalls: 1,
    showAlertArgs: [
      "danger",
      "Sign in failed",
    ],
    formData: (() => {
      const formData = new FormData();
      formData.set("email", "test@test.com");
      formData.set("firstName", "Test");
      formData.set("lastName", "Test");
      formData.set("password", "Password123!");
      return formData;
    })(),
  },
  {
    description: `
      Given a valid form data ALT scenario
      When the submitSignIn function is called but the fetchWrapper returns an error
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
      "Sign in failed",
    ],
    formData: (() => {
      const formData = new FormData();
      formData.set("email", "test@test.com");
      formData.set("firstName", "Test");
      formData.set("lastName", "Test");
      formData.set("password", "Password123!");
      return formData;
    })(),
  },
  {
    description: `
      Given an invalid form data
      When the submitSignIn function is called
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
      formData.set("firstName", "Test");
      formData.set("lastName", "Test");
      formData.set("password", "");
      return formData;
    })(),
  },
];
