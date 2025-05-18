import { submitLogOut } from "@/app/login/helpers/submitLogout";
import { fetchWrapper } from "@/app/_global/helpers/fetchWrapper";
import { testCases } from "./submitLogout.fixtures";
jest.mock('@/app/_global/helpers/fetchWrapper', () => ({
    fetchWrapper: jest.fn(),
}));
jest.mock('next/navigation', () => ({
    redirect: jest.fn(),
}));

describe('submitLogOut', () => {
    test.each(testCases)('$description', async ({fetchWrapperMockResult, showAlertNbOfCalls, showAlertArgs}) => {
        (fetchWrapper as jest.Mock).mockResolvedValueOnce(fetchWrapperMockResult);
        const showAlertFn = jest.fn();
        await submitLogOut(showAlertFn);
        if(showAlertNbOfCalls > 0) expect(showAlertFn).toHaveBeenCalledWith(...showAlertArgs);
    });
});