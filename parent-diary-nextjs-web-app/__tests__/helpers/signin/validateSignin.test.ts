import { validateSignin } from "@/app/signin/helpers/signin.validation";
import { testCases } from "./validateSignin.fixtures";

describe('validateSignin', () => {
    test.each(testCases)('$description', ({input, expected}) => {
        const result = validateSignin(input);
        expect(result).toEqual(expected);
    });
});