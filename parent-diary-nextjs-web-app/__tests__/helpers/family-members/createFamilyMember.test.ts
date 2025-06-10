import { fetchWrapper } from "@/app/_global/helpers/fetchWrapper";
import createFamilyMember from "@/app/new-family-member/helpers/createFamilyMember";
import { testCases } from "./createFamilyMember.fixtures";

jest.mock('@/app/_global/helpers/fetchWrapper', () => ({
    fetchWrapper: jest.fn(),
}));
jest.mock('next/navigation', () => ({
    redirect: jest.fn(),
}));

describe('createFamilyMember', () => {
    test.each(testCases)('$description', async ({fetchWrapperMockResult, showAlertNbOfCalls, showAlertArgs, formData}) => {
        (fetchWrapper as jest.Mock).mockResolvedValueOnce(fetchWrapperMockResult);
        const showAlertFn = jest.fn();
        await createFamilyMember(formData, showAlertFn, ()=>{}, {}, ()=>{});
        expect(showAlertFn).toHaveBeenCalledTimes(showAlertNbOfCalls);
        if(showAlertNbOfCalls > 0) expect(showAlertFn).toHaveBeenCalledWith(...showAlertArgs);
    });
});