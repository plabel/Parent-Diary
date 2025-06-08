type SendPasswordResetEmailTestCase = {
    description: string;
    to: string;
    token: string;
}

export const sendPasswordResetEmailTestCases: SendPasswordResetEmailTestCase[] = [
    {
        description: 'should send a password reset email',
        to: 'test@test.com',
        token: '1234567890',
    },
    {
        description: 'should send a password reset email, alternative email',
        to: 'test2@test.com',
        token: '765827682758',
    },
]