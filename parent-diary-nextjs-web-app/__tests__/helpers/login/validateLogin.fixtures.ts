export type ValidateLoginTestCase = {
    description: string;
    input: unknown;
    expected: {
        formErrors: Record<string, boolean>;
        isValid: boolean;
    };
}

export const testCases: ValidateLoginTestCase[] = [
    {
        description: `
          Given a valid input object
          When the validateLogin function is called
          Then the function should return a valid output
        `,    
        input: {
            email: 'test@test.com',
            password: 'Password1234',
        },
        expected: {
            formErrors: {
                email: false,
                password: false,
            },
            isValid: true,
        },
    },
    {
        description: `
          Given an invalid input object
          When the validateLogin function is called
          Then the function should return an invalid output
        `,    
        input: {
            email: '',
            password: 'Password1234',
        },
        expected: {
            formErrors: {
                email: true,
                password: false,
            },
            isValid: false,
        },
    },
];
