type DeleteUserTestCase = {
  description: string;
  fetchWrapperMockResult: {
    data: boolean | null;
    error: unknown | null;
  };
  showAlertNbOfCalls: number;
  showAlertArgs: [string, string];
};

export const testCases: DeleteUserTestCase[] = [
  {
    description: `
      Given the deleteUser function is called
      Then the showAlert function is called with the correct arguments
    `,
    fetchWrapperMockResult: {
      data: true,
      error: null,
    },
    showAlertNbOfCalls: 1,
    showAlertArgs: ['success', 'User deleted successfully'],
  },
  {
    description: `
      Given the deleteUser function is called but the fetchWrapper returns an error
      Then the showAlert function is called with the correct arguments
    `,
    fetchWrapperMockResult: {
      data: false,
      error: {
        message: 'User deletion failed',
      },
    },
    showAlertNbOfCalls: 1,
    showAlertArgs: ['danger', 'User deletion failed'],
  },
];
