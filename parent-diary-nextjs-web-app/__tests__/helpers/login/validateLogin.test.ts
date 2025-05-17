import { validateLogin } from "@/app/login/helpers/login.validation";
import { testCases } from "./validateLogin.fixtures";

describe('validateLogin', () => {
    test.each(testCases)('$description', ({input, expected}) => {
        const result = validateLogin(input);
        expect(result).toEqual(expected);
    });
});