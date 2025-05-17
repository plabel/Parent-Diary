import { LogInDto } from "./dto/log-in.dto";
import { User } from "./user.model";

type LoginTestCase = {
    description: string;
    logInDto: LogInDto;
    findOneResolvedValue: User | null;
    expectedResult: User | null;
}

export const loginTestCases: LoginTestCase[] = [
    {
        description: `
          Given the user is not found,
          Then the return value is null
        `,
        logInDto: {
            email: 'test@test.com',
            password: 'password'
        },
        findOneResolvedValue: null,
        expectedResult: null
    },
    {
        description: `
          Given the user is found,
          When the password is correct,   
          Then the return value is the user
        `,
        logInDto: {
            email: 'test@test.com',
            password: 'Password1234'
        },
        findOneResolvedValue: {
            dataValues: {
                id: '1234567890',
                email: 'test@test.com',
                salt: '2a5b56e548971eed76c65369f5e5a533e4fdded4',
                passwordHash: "b3c2a74326c663b378f90e65863c0ac2ff8c4ffd422ea32dcec1e8e44d13dd31"
            }
        } as User,
        expectedResult: {
            dataValues: {
                id: '1234567890',
                email: 'test@test.com',
                salt: '2a5b56e548971eed76c65369f5e5a533e4fdded4',
                passwordHash: "b3c2a74326c663b378f90e65863c0ac2ff8c4ffd422ea32dcec1e8e44d13dd31"
            }
        } as User
    },
    {
        description: `
          Given the user is found,
          When the password is incorrect,   
          Then the return value is null
        `,
        logInDto: {
            email: 'test@test.com',
            password: 'BadPassword1234'
        },
        findOneResolvedValue: {
            dataValues: {
                id: '1234567890',
                email: 'test@test.com',
                salt: '2a5b56e548971eed76c65369f5e5a533e4fdded4',
                passwordHash: "b3c2a74326c663b378f90e65863c0ac2ff8c4ffd422ea32dcec1e8e44d13dd31"
            }
        } as User,
        expectedResult: null
    }
]
