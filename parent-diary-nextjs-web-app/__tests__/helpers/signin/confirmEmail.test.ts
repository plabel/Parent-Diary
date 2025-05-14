import { confirmEmail } from "@/app/users/confirm-email/[token]/helpers/confirmEmail";
import { testCases } from "./confirmEmail.fixtures";
import { fetchWrapper } from "@/app/_global/helpers/fetchWrapper";
jest.mock('@/app/_global/helpers/fetchWrapper', () => ({
    fetchWrapper: jest.fn(),
}));

describe('confirmEmail', () => {
    test.each(testCases)('$description', async ({token, showAlertNbOfCalls, setIsConfirmedNbOfCalls, fetchWrapperMockResult}) => {
        (fetchWrapper as jest.Mock).mockResolvedValueOnce(fetchWrapperMockResult);
        const showAlertFn = jest.fn();
        const setIsConfirmedFn = jest.fn();
        await confirmEmail(token, setIsConfirmedFn, showAlertFn);
        expect(showAlertFn).toHaveBeenCalledTimes(showAlertNbOfCalls);
        expect(setIsConfirmedFn).toHaveBeenCalledTimes(setIsConfirmedNbOfCalls);
    });
});