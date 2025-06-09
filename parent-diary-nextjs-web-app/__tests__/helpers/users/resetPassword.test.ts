import { fetchWrapper } from "@/app/_global/helpers/fetchWrapper";
import { testCases } from "./resetPassword.fixtures";
import { resetPassword } from "@/app/users/reset-password/[token]/helpers/resetPassword";
jest.mock('@/app/_global/helpers/fetchWrapper', () => ({
    fetchWrapper: jest.fn(),
}));
jest.mock('next/navigation', () => ({
    redirect: jest.fn(),
}));

describe('resetPassword', () => {
    test.each(testCases)('$description', async ({token, showAlertArgs, formData, fetchWrapperMockResult}) => {
        (fetchWrapper as jest.Mock).mockResolvedValueOnce(fetchWrapperMockResult);
        const showAlertFn = jest.fn();
        const setFormErrorsFn = jest.fn();
        const formErrorsState = {
            password: false,
            confirmPassword: false,
        };
        const setLoadingFn = jest.fn();
        await resetPassword(formData, token, showAlertFn, setFormErrorsFn, formErrorsState, setLoadingFn);
        expect(showAlertFn).toHaveBeenCalledWith(...showAlertArgs);
    });
});