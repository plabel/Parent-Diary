type DeleteLogEntryTestCase = {
  description: string;
  fetchWrapperMockResult: any;
  showAlertArgs: any[];
};

export const testCases: DeleteLogEntryTestCase[] = [
  {
    description: 'should delete log entry',
    fetchWrapperMockResult: {
      data: true,
      error: null,
    },
    showAlertArgs: ['success', 'Log entry deleted successfully'],
  },
  {
    description: 'should not delete log entry, fetch error',
    fetchWrapperMockResult: {
      data: null,
      error: {
        message: 'Fetch error',
      },
    },
    showAlertArgs: ['danger', 'Fetch error'],
  },
  {
    description: 'should not delete log entry, fetch error no msg',
    fetchWrapperMockResult: {
      data: null,
      error: {},
    },
    showAlertArgs: ['danger', 'Log entry deletion failed'],
  },
];
