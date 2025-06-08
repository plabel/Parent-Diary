export type ValidateResetPasswordTestCase = {
    description: string;
    input: unknown;
    expected: {
        formErrors: Record<string, boolean>;
        isValid: boolean;
    };
}

export const testCases: ValidateResetPasswordTestCase[] = [
    {
        description: 'should validate reset password',
        input: {
            password: 'Password1234',
            confirmPassword: 'Password1234',
        },
        expected: {
            formErrors: {
                password: false,
                confirmPassword: false,
            },
            isValid: true,
        },
    },
    {
        description: 'should not validate reset password because the password is not strong',
        input: {
            password: 'password',
            confirmPassword: 'password',
        },
        expected: {
            formErrors: {
                password: true,
                confirmPassword: false,
            },
            isValid: false,
        },
    },
]
