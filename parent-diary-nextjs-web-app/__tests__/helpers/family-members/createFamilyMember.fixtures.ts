type CreateFamilyMemberTestCase = {
  description: string;
  fetchWrapperMockResult: any;
  showAlertNbOfCalls: number;
  showAlertArgs: any[];
  formData: FormData;
};

export const testCases: CreateFamilyMemberTestCase[] = [
  {
    description: 'should create a family member',
    fetchWrapperMockResult: {
      data: true,
      error: null,
    },
    showAlertNbOfCalls: 1,
    showAlertArgs: ['success', 'Family member created successfully'],
    formData: (() => {
      const formData = new FormData();
      formData.set('firstName', 'John');
      formData.set('lastName', 'Doe');
      formData.set('petName', 'Buddy');
      return formData;
    })(),
  },
  {
    description: 'should not create a family member, if form is invalid',
    fetchWrapperMockResult: {
      data: false,
      error: null,
    },
    showAlertNbOfCalls: 0,
    showAlertArgs: [],
    formData: (() => {
      const formData = new FormData();
      formData.set('firstName', 'John');
      return formData;
    })(),
  },
  {
    description:
      'should not create a family member, if fetchWrapper returns an error',
    fetchWrapperMockResult: {
      data: false,
      error: {
        message: 'Family member creation failed',
      },
    },
    showAlertNbOfCalls: 1,
    showAlertArgs: ['danger', 'Family member creation failed'],
    formData: (() => {
      const formData = new FormData();
      formData.set('firstName', 'John');
      formData.set('lastName', 'Doe');
      formData.set('petName', 'Buddy');
      return formData;
    })(),
  },
];
