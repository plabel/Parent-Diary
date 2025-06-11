type CreateLogEntryTestCase = {
  description: string;
  fetchWrapperMockResult: any;
  showAlertNbOfCalls: number;
  showAlertArgs: any[];
  formData: FormData;
};

export const testCases: CreateLogEntryTestCase[] = [
  {
    description: 'should create a log entry',
    fetchWrapperMockResult: {
      data: true,
      error: null,
    },
    showAlertNbOfCalls: 1,
    showAlertArgs: ['success', 'Log entry created successfully'],
    formData: (() => {
      const formData = new FormData();
      formData.set('entry', 'This is a test log entry');
      formData.set('familyMembers', '');
      return formData;
    })(),
  },
  {
    description:
      'should not create a log entry, if fetchWrapper returns an error',
    fetchWrapperMockResult: {
      data: false,
      error: {
        message: 'Log entry creation failed',
      },
    },
    showAlertNbOfCalls: 1,
    showAlertArgs: ['danger', 'Log entry creation failed'],
    formData: (() => {
      const formData = new FormData();
      formData.set('entry', 'This is a test log entry');
      formData.set('familyMembers', '');
      return formData;
    })(),
  },
  {
    description: 'should not create a log entry, if form is invalid',
    fetchWrapperMockResult: {
      data: false,
      error: null,
    },
    showAlertNbOfCalls: 0,
    showAlertArgs: ['danger', 'Log entry creation failed'],
    formData: (() => {
      const formData = new FormData();
      formData.set('entry', '');
      formData.set('familyMembers', '');
      return formData;
    })(),
  },
];
