type ConfirmEmailTestCase = {
  description: string;
  token: string;
  showAlertNbOfCalls: number;
  setIsConfirmedNbOfCalls: number;
  fetchWrapperMockResult: {
    data: boolean | null;
    error: {
      message: string;
    } | null;
  };
};

export const testCases: ConfirmEmailTestCase[] = [
  {
    description: `
            Given a valid token
            When data equals true
            Then setIsConfirmed is called once
        `,
    token: '1234567890',
    showAlertNbOfCalls: 0,
    setIsConfirmedNbOfCalls: 1,
    fetchWrapperMockResult: {
      data: true,
      error: null,
    },
  },
  {
    description: `
            Given a valid token
            When data does not equal true
            Then showAlert is called once
        `,
    token: '1234567890',
    showAlertNbOfCalls: 1,
    setIsConfirmedNbOfCalls: 0,
    fetchWrapperMockResult: {
      data: null,
      error: {
        message: 'Error confirming email',
      },
    },
  },
  {
    description: `
            Given a valid token in an alternative scenario
            When data does not equal true
            Then showAlert is called once
        `,
    token: '1234567890',
    showAlertNbOfCalls: 1,
    setIsConfirmedNbOfCalls: 0,
    fetchWrapperMockResult: {
      data: null,
      error: null,
    },
  },
];
