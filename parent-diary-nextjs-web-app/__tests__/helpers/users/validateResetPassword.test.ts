import { validateResetPassword } from "@/app/users/reset-password/[token]/helpers/resetPassword.validation";
import { testCases } from "./validateResetPassword.fixtures";

describe('validateResetPassword', () => {
    test.each(testCases)('$description', ({input, expected}) => {
        const result = validateResetPassword(input);
        expect(result).toEqual(expected);
    });
});