type SendConfirmationEmailTestCase = {
    description: string;
    to: string;
    token: string;
}

export const sendConfirmationEmailTestCases: SendConfirmationEmailTestCase[] = [
    {
        description: `
          Given a user with email 'test@test.com' and token '1234567890',
          Then the sendMail method should be called with the correct parameters
        `,
        to: 'test@test.com',
        token: '1234567890',
    },
]

