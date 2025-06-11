type SubmitLogOutTestCase = {
  description: string;
  fetchWrapperMockResult: {
    data: boolean | null;
    error: unknown | null;
  };
  showAlertNbOfCalls: number;
  showAlertArgs: [string, string];
};

export const testCases: SubmitLogOutTestCase[] = [
  {
    description: `
      Given the submitLogOut function is called
      Then the showAlert function is called with the correct arguments
    `,
    fetchWrapperMockResult: {
      data: true,
      error: null,
    },
    showAlertNbOfCalls: 1,
    showAlertArgs: ['success', 'Log out successful'],
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
        message: 'Log out failed',
      },
    },
    showAlertNbOfCalls: 1,
    showAlertArgs: ['danger', 'Log out failed'],
  },
];
