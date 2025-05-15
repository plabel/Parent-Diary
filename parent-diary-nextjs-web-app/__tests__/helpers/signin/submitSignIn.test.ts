import { submitSignIn } from "@/app/signin/helpers/submitSignIn";
import { fetchWrapper } from "@/app/_global/helpers/fetchWrapper";
import { testCases } from "./submitSignIn.fixtures";
jest.mock('@/app/_global/helpers/fetchWrapper', () => ({
    fetchWrapper: jest.fn(),
}));

describe('submitSignIn', () => {
    test.each(testCases)('$description', async ({fetchWrapperMockResult, showAlertNbOfCalls, showAlertArgs, formData}) => {
        (fetchWrapper as jest.Mock).mockResolvedValueOnce(fetchWrapperMockResult);
        const showAlertFn = jest.fn();
        await submitSignIn(formData, showAlertFn, ()=>{}, {}, ()=>{});
        if(showAlertNbOfCalls > 0) expect(showAlertFn).toHaveBeenCalledWith(...showAlertArgs);
    });
});