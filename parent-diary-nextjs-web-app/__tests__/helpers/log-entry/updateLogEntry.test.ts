import { fetchWrapper } from "@/app/_global/helpers/fetchWrapper";
import updateLogEntry from "@/app/_log-entry/helpers/updateLogEntry";
import { testCases } from "./updateLogEntry.fixtures";

jest.mock('@/app/_global/helpers/fetchWrapper', () => ({
    fetchWrapper: jest.fn(),
}));
jest.mock('next/navigation', () => ({
    redirect: jest.fn(),
}));

describe('updateLogEntry', () => {
    test.each(testCases)('$description', async ({fetchWrapperMockResult, showAlertNbOfCalls, showAlertArgs, formData}) => {
        (fetchWrapper as jest.Mock).mockResolvedValueOnce(fetchWrapperMockResult);
        const showAlertFn = jest.fn();
        await updateLogEntry(1, formData, showAlertFn, ()=>{}, {}, ()=>{}, async ()=>{}, ()=>{});
        if(showAlertNbOfCalls > 0) expect(showAlertFn).toHaveBeenCalledWith(...showAlertArgs);
    });
});