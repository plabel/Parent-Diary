type DeleteFamilyMemberTestCase = {
  description: string;
  fetchWrapperMockResult: any;
  showAlertNbOfCalls: number;
  showAlertArgs: any[];
};

export const testCases: DeleteFamilyMemberTestCase[] = [
  {
    description: 'should delete a family member',
    fetchWrapperMockResult: {
      data: true,
      error: null,
    },
    showAlertNbOfCalls: 1,
    showAlertArgs: ['success', 'Family member deleted successfully'],
  },
  {
    description:
      'should not delete a family member, if fetchWrapper returns an error',
    fetchWrapperMockResult: {
      data: false,
      error: {
        message: 'Family member deletion failed',
      },
    },
    showAlertNbOfCalls: 1,
    showAlertArgs: ['danger', 'Family member deletion failed'],
  },
];
