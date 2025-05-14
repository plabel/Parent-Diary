import { fetchWrapper } from "@/app/_global/helpers/fetchWrapper";
import { testCases } from "./fetchWrapper.fixtures";

describe('fetchWrapper', () => {
    test.each(testCases)('$description', async ({url, options, expected, fetchMock}) => {
        global.console.warn = jest.fn();
        global.fetch = jest.fn().mockImplementation(fetchMock);
        const result = await fetchWrapper(url, options);
        expect(result).toEqual(expected);
    });
});