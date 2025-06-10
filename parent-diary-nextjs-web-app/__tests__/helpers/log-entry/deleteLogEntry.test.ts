import { fetchWrapper } from "@/app/_global/helpers/fetchWrapper";
import { deleteLogEntry } from "@/app/_log-entry/helpers/deleteLogEntry";
import { testCases } from "./deleteLogEntry.fixtures";
jest.mock('@/app/_global/helpers/fetchWrapper', () => ({
    fetchWrapper: jest.fn(),
}));
jest.mock('next/navigation', () => ({
    redirect: jest.fn(),
}));

describe('deleteLogEntry', () => {
    test.each(testCases)('$description', async ({fetchWrapperMockResult, showAlertArgs}) => {
        (fetchWrapper as jest.Mock).mockResolvedValueOnce(fetchWrapperMockResult);
        const showAlertFn = jest.fn();
        await deleteLogEntry(1, ()=>{}, showAlertFn, ()=>{});
        expect(showAlertFn).toHaveBeenCalledWith(...showAlertArgs);
    });
});