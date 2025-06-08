import { User } from "./user.model";

type ResetRecoveryCodeTestCases = {
    description: string;
    userId: string;
    findByPkResolvedValue: User | null;
    expectedResult: User | null;
    expectedError?: Error;
}
const fakeUser: User = {
    id: '1',
    email: 'test@test.com',
    recoveryCode: '1234567890',
    isEmailVerified: true,
} as User;
export const resetRecoveryCodeTestCases: ResetRecoveryCodeTestCases[] = [
    {
        description: `
            Given the User is found
            When the resetRecoveryCode method is called
            Then the User is returned
        `,
        userId: '1',
        findByPkResolvedValue: fakeUser,
        expectedResult: fakeUser,
        expectedError: undefined,
    },
    {
        description: `
            Given the User is not found
            When the resetRecoveryCode method is called
            Then the User is not returned
            And the error is thrown
        `,
        userId: '1',
        findByPkResolvedValue: null,
        expectedResult: null,
        expectedError: new Error('User not found'),
    },
]