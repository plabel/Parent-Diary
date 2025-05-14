export type ValidateSigninTestCase = {
    description: string;
    input: unknown;
    expected: {
        formErrors: Record<string, boolean>;
        isValid: boolean;
    };
}

export const testCases: ValidateSigninTestCase[] = [
    {
        description: `
          Given a valid input object
          When the validateSignin function is called
          Then the function should return a valid output
        `,    
        input: {
            email: 'test@test.com',
            firstName: 'test',
            lastName: 'test',
            password: 'Password1234',
        },
        expected: {
            formErrors: {
                email: false,
                firstName: false,
                lastName: false,
                password: false,
            },
            isValid: true,
        },
    },
    {
        description: `
          Given an invalid input object
            and the password is not at least 12 characters
          When the validateSignin function is called
          Then the function should return an invalid output
        `,    
        input: {
            email: 'test@test.com',
            firstName: 'test',
            lastName: 'test',
            password: 'Passwor',
        },
        expected: {
            formErrors: {
                email: false,
                firstName: false,
                lastName: false,
                password: true,
            },
            isValid: false,
        },
    },
    {
        description: `
          Given an invalid input object
            and all fields are empty
          When the validateSignin function is called
          Then the function should return an invalid output
        `,    
        input: {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
        },
        expected: {
            formErrors: {
                email: true,
                firstName: true,
                lastName: true,
                password: true,
            },
            isValid: false,
        },
    },
];
