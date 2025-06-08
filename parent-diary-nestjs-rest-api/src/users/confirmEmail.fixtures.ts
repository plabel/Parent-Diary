import { User } from "./user.model";

type ConfirmEmailTestCase = {
    description: string;
    token: string;
    expectedResult?: { user: User, keyUri: string };
    findByPkResolvedValue: unknown | undefined;
}

export const confirmEmailTestCases: ConfirmEmailTestCase[] = [
    {
        description: 'should return true if the token is valid',
        token: '1234567890',
        findByPkResolvedValue: {
            dataValues: {
                id: '1234567890',
            }
        },
        expectedResult: {
            keyUri: "123456",
            user: {
                dataValues: {
                    id: "1234567890"
                }
            } as User
        }
    },
    {
        description: 'should return false if an error occurs',
        token: 'U2FsdGVkX1/Ae6NG1uFLUKdOtN5EXnkHL8utE/wUD509hYAOlW2hc6JbhIUnxcUNvg/HJlh6/sTAZpuxKg/CGfmEjzwPbsfihVnM74x9BjsHClwD8wxNR/afJavewedI',
        expectedResult: undefined,
        findByPkResolvedValue: undefined
    },
]