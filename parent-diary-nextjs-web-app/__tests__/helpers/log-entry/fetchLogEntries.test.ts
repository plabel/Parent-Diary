import { fetchLogEntries } from "@/app/_log-entry/helpers/fetchLogEntries";
import { testCases } from "./fetchLogEntries.fixtures";
import { fetchWrapper } from "@/app/_global/helpers/fetchWrapper";

jest.mock('@/app/_global/helpers/fetchWrapper', () => ({
    fetchWrapper: jest.fn(),
}));


describe('fetchLogEntries', () => {
    test.each(testCases)('$description', async ({ fetchWrapperMockResult, setLogEntriesArgs, createdAfter, createdBefore }) => {
        (fetchWrapper as jest.Mock).mockResolvedValueOnce(fetchWrapperMockResult);
        const setLogEntriesFn = jest.fn();
        await fetchLogEntries(setLogEntriesFn, 1, "", "desc", [], createdAfter, createdBefore);
        expect(setLogEntriesFn).toHaveBeenCalledWith(...setLogEntriesArgs);
    });
});