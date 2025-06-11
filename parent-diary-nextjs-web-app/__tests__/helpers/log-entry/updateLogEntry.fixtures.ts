type UpdateLogEntryTestCase = {
  description: string;
  fetchWrapperMockResult: any;
  showAlertNbOfCalls: number;
  showAlertArgs: any[];
  formData: any;
};

export const testCases: UpdateLogEntryTestCase[] = [
  {
    description: 'should update log entry',
    fetchWrapperMockResult: {
      data: true,
      error: null,
    },
    showAlertNbOfCalls: 1,
    showAlertArgs: ['success', 'Log entry updated successfully'],
    formData: (() => {
      const formData = new FormData();
      formData.set('entry', 'This is a test log entry');
      formData.set('familyMembers', '');
      return formData;
    })(),
  },
  {
    description: 'should not update log entry, if form is invalid',
    fetchWrapperMockResult: {
      data: false,
      error: null,
    },
    showAlertNbOfCalls: 0,
    showAlertArgs: ['danger', 'Log entry update failed'],
    formData: (() => {
      const formData = new FormData();
      formData.set('entry', '');
      formData.set('familyMembers', '');
      return formData;
    })(),
  },
  {
    description: 'should not update log entry, fetch error',
    fetchWrapperMockResult: {
      data: false,
      error: {
        message: 'Log entry update failed',
      },
    },
    showAlertNbOfCalls: 1,
    showAlertArgs: ['danger', 'Log entry update failed'],
    formData: (() => {
      const formData = new FormData();
      formData.set('entry', 'This is a test log entry');
      formData.set('familyMembers', '');
      return formData;
    })(),
  },
];
