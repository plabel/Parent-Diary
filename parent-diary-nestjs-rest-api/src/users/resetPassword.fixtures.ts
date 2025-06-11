type ResetPasswordTestCase = {
  description: string;
  expectedResult: boolean;
  expectedError?: Error;
  tokenObj: { token: string; creationDate: number };
  now: number;
  updateAffectedCount: number;
};

export const resetPasswordTestCases: ResetPasswordTestCase[] = [
  {
    description: 'should reset password',
    expectedResult: true,
    expectedError: undefined,
    tokenObj: { token: '1234567890', creationDate: 1234567890 },
    now: 1234567890,
    updateAffectedCount: 1,
  },
  {
    description: 'should not reset password because the token is expired',
    expectedResult: false,
    expectedError: new Error('Token expired'),
    tokenObj: { token: '1234567890', creationDate: 234567890 },
    now: 1234567890,
    updateAffectedCount: 1,
  },
];
